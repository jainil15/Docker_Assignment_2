const db = require("../db.js");
const jwt = require("jsonwebtoken");
const redisClient = require("../redisdb.js");

const DEFAULT_EXPIRATION = 4800;

const getPosts = async (req, res) => {
  // connecting to redis client
  const keyval = `cat=${req.query.cat}`;
  redisClient.get(keyval, (error, cachedData) => {
    console.log("in redis get");
    if (error) {
      console.log(error);
    } else if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const q = req.query.cat
        ? "SELECT * FROM posts where cat=?"
        : "SELECT * FROM posts";
      db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        redisClient.set(keyval, JSON.stringify(data), "EX", DEFAULT_EXPIRATION);
        return res.status(200).json(data);
      });
    }
  });
};

const getPost = (req, res) => {
  const keyval = `post_${req.params.id}`;
  redisClient.get(keyval, (error, cachedData) => {
    if (error) console.log(error);
    else if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const q =
        "SELECT p.id, u.username, `title`, `desc`, p.img, u.img AS userImage, `cat`, `date` FROM userd u JOIN posts p ON u.id = p.userid WHERE p.id=?";

      db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data[0]);
        redisClient.set(
          keyval,
          JSON.stringify(data[0]),
          "EX",
          DEFAULT_EXPIRATION
        );
        return res.status(200).json(data[0]);
      });
    }
  });
};

const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const keyval = `post_${req.params.id}`; //
    const category_q = "SELECT cat FROM posts WHERE id = ? and userid = ?";
    db.query(category_q, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json("You can delete only your post");
      }
      console.log(data);
      redisClient.del(`cat=${data}`);
    });

    const q = "DELETE FROM posts WHERE id = ? and userid = ?";
    console.log(postId, userInfo.id);
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json("You can delete only your post");
      }
      redisClient.del(keyval);
      redisClient.del(`cat=undefined`);
      return res.json("Post has been deleted");
    });
  });
};

const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authencticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Toke is not valid");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `userid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    console.log([...values]);
    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      redisClient.del(`cat=${req.query.cat}`);
      redisClient.del(`cat=undefined`);
      return res.json("Post has benn created ");
    });
  });
};

const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authencticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Toke is not valid");

    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `userid`=?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated ");
    });
  });
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
