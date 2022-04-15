const express = require("express");
const postsRouter = express.Router();

const {
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

postsRouter.route("/").get(getAllPosts).post(createPost);
postsRouter.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = postsRouter;
