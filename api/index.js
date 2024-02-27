const express = require("express");
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auths.js");
const userRoutes = require("./routes/users.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log("called");
  const file = req.file;
  res.status(200).json(file.filename);
});

// app.get("/api/upload/:id", function (req, res) {

// })

app.get("/api/file/:filename", function (req, res) {
  const filename = req.params.filename;
  const filePath = `./uploads/${filename}`;
  console.log(filename, filePath);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving file");
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=" + filename);
    res.send(data);
  });
});

app.listen(8800, () => {
  console.log("Connected t0 8800");
});

module.exports = app;
