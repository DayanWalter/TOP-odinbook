const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const User = require('../models/user');
// Validate and sanitize input at createUser
const { body, validationResult } = require('express-validator');
// TODO: Validate and sanitize
const createPost = asyncHandler(async (req, res, next) => {
  // Validate and sanitize input(body)
  const post = new Post({
    author_id: req.user._id,
    content: req.body.content,
  });
  // Save to database
  await post.save();

  // Add post._id to posts_id
  await User.findByIdAndUpdate(req.user._id, {
    $push: { posts_id: post._id },
  });
  res.json({ createPost: 'Route works', post });
});
// TODO:First add post_id to user at createPost
const readAllFeedPosts = asyncHandler(async (req, res, next) => {
  res.json({ readAllFeedPosts: 'Route works' });
});
// TODO:First add post_id to user at createPost
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
  // Check if the logged in user wrote the post

  // take the id from jwt
  const postIdToDelete = req.params.postid;
  const deletedPost = await Post.findByIdAndDelete(postIdToDelete).exec();
  if (!deletedPost) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  // Remove post._id from user.posts_id
  await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { posts_id: postIdToDelete } },
    { new: true } // Return the updated user document
  );

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
