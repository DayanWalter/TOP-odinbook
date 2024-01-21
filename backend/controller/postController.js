const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
// Validate and sanitize input at createUser
const { body, validationResult } = require('express-validator');

const createPost = asyncHandler(async (req, res, next) => {
  res.json({ createPost: 'Route works' });
});
const readAllFeedPosts = asyncHandler(async (req, res, next) => {
  res.json({ readAllFeedPosts: 'Route works' });
});
const readAllUserPosts = asyncHandler(async (req, res, next) => {
  res.json({ readAllUserPosts: 'Route works' });
});
const readPostById = asyncHandler(async (req, res, next) => {
  res.json({ readPostById: 'Route works' });
});
const updatePost = asyncHandler(async (req, res, next) => {
  res.json({ updatePost: 'Route works' });
});
const deletePost = asyncHandler(async (req, res, next) => {
  res.json({ deletePost: 'Route works' });
});

module.exports = {
  createPost,
  readAllFeedPosts,
  readAllUserPosts,
  readPostById,
  updatePost,
  deletePost,
};
