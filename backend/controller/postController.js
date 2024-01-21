const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
// Validate and sanitize input at createUser
const { body, validationResult } = require('express-validator');

const createPost = asyncHandler(async (req, res, next) => {
  const userid = req.user._id;
  // Validate and sanitize input(body)
  const post = new Post({
    author_id: userid,
    content: req.body.content,
  });
  // Add post._id to user._id
  // Save to database
  post.save();
  res.json({ createPost: 'Route works', post });
});
// TODO:First add post_id to user
const readAllFeedPosts = asyncHandler(async (req, res, next) => {
  res.json({ readAllFeedPosts: 'Route works' });
});
// TODO:First add post_id to user
const readAllUserPosts = asyncHandler(async (req, res, next) => {
  res.json({ readAllUserPosts: 'Route works' });
});

const readPostById = asyncHandler(async (req, res, next) => {
  const searchedPost = await Post.findById(req.params.postid).exec();
  res.json({ readPostById: 'Route works', searchedPost });
});
const updatePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postid;
  const content = req.body.content;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      content,
    },
    {
      new: true,
    }
  ).exec();

  res.json({ updatePost: 'Route works', updatedPost });
});
const deletePost = asyncHandler(async (req, res, next) => {
  // take the id from jwt
  const postIdToDelete = req.params.postid;
  const deletedPost = await Post.findByIdAndDelete(postIdToDelete).exec();
  if (!deletedPost) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.json({ deletePost: 'Route works', deletedPost });
});

module.exports = {
  createPost,
  readAllFeedPosts,
  readAllUserPosts,
  readPostById,
  updatePost,
  deletePost,
};
