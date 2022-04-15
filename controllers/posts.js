const Post = require("../models/Post");
const User = require("../models/User");

// Create Post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update Post
const updatePost = async (req, res) => {
  // logic- first im gonna find my post & then im gonna compare the post username to our username inside the req.body
  // if theyre same, we can update & if they are not its not our post & we're not allowed to update that

  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const post = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(post);
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(401).json("You can update only your post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Post has been deleted...");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(401).json("You can delete only your post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get Post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  const username = req.query.user; //    "/user?=body"
  const catName = req.query.category;
  try {
    // create a Post array as we're gonna return this array as response
    let posts;
    if (username) {
      posts = await Post.find({ username: username }); //if the post ka username = username
    } else if (catName) {
      posts = await Post.find({
        categories: {
          // if this categories array includes this catName
          $in: [catName], // this means that the catName is inside this categories array then just find this and assign to posts
        },
      });
    } else {
      // & if there is no username & no catName its gonna just fetch all posts(there's no condition)
      posts = await Post.find({});
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getPost, getAllPosts, createPost, updatePost, deletePost };
