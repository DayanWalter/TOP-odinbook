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
const readAllFeedPosts = asyncHandler(async (req, res, next) => {
  // take req.user._id's follows array
  const user = await User.findById(req.user._id)
    .select('follows_id')
    .populate({
      path: 'follows_id',
      select: 'posts_id',
      populate: {
        path: 'posts_id',
      },
    })
    // Make request smaller
    .lean();

  const feed = user.follows_id.flatMap((element) => element.posts_id);

  res.json({ readAllFeedPosts: 'Route works', feed });
});
const readAllUserPosts = asyncHandler(async (req, res, next) => {
  // Take userid from params
  const allUserPosts = await User.findById(req.params.userid)
    .select('posts_id')
    .populate('posts_id')
    // Make request smaller
    .lean();
  // Return allUserPosts object to client
  res.json({ readAllUserPosts: 'Route works', allUserPosts });
});
const readPostById = asyncHandler(async (req, res, next) => {
  const searchedPost = await Post.findById(req.params.postid).lean();
  res.json({ readPostById: 'Route works', searchedPost });
});
const updatePost = asyncHandler(async (req, res, next) => {
  // Check if logged in user wrote the post
  const post = await Post.findById(req.params.postid)
    .select('author_id')
    .exec();

  if (post.author_id.equals(req.user._id)) {
    const content = req.body.content;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postid,
      {
        content,
      },
      {
        new: true,
      }
    ).exec();

    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json({ updatePost: 'Route works', updatedPost });
  } else {
    res.json({ updatePost: 'You did not write this post' });
  }
});
const deletePost = asyncHandler(async (req, res, next) => {
  // Check if the logged in user wrote the post
  const post = await Post.findById(req.params.postid)
    .select('author_id')
    .exec();

  if (post.author_id.equals(req.user._id)) {
    const deletedPost = await Post.findByIdAndDelete(req.params.postid).exec();

    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Remove post._id from user.posts_id
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { posts_id: req.params.postid } },
      { new: true } // Return the updated user document
    );

    res.json({ deletePost: 'Route works', deletedPost });
    return;
  } else {
    res.json({ deletePost: 'You did not write this post' });
    return;
  }
});

module.exports = {
  createPost,
  readAllFeedPosts,
  readAllUserPosts,
  readPostById,
  updatePost,
  deletePost,
};
