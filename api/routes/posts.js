const express = require("express");

const router = express.Router();

const {
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
} = require("../controllers/post.js");

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", addPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
