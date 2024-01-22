const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const createPost = [
  body('content').trim().isLength({ max: 200 }).escape(),

  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
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
    } else {
      // List all errors in the console
      result.array().map((error) => console.log(error.msg));
      // Send failure message to client and the error object
      res.status(404).json({ createPost: 'Failure', result });
    }
  }),
];
const readFeedPosts = asyncHandler(async (req, res, next) => {
  // take req.user._id's follows array
  const user = await User.findById(req.user._id).select('follows_id');
  // Map over array and pull out ._id of every user
  const followedUserIds = user.follows_id.map((follow) => follow._id);
  // Search for posts in which the author_id is the same as the user._id
  const feed = await Post.find({ author_id: { $in: followedUserIds } });

  res.json({ readFeedPosts: 'Route works', feed });
});
const readUserPosts = asyncHandler(async (req, res, next) => {
  // Take userid from params
  const userPosts = await User.findById(req.params.userid)
    .select('posts_id')
    .populate('posts_id');
  const posts = userPosts.posts_id;
  // Return posts object to client
  res.json({ readUserPosts: 'Route works', posts });
});
const readPostById = asyncHandler(async (req, res, next) => {
  const searchedPost = await Post.findById(req.params.postid);
  res.json({ readPostById: 'Route works', searchedPost });
});
const updatePost = asyncHandler(async (req, res, next) => {
  // Check if logged in user wrote the post
  const post = await Post.findById(req.params.postid).select('author_id');

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
    );

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
  const post = await Post.findById(req.params.postid).select('author_id');

  if (post.author_id.equals(req.user._id)) {
    const deletedPost = await Post.findByIdAndDelete(req.params.postid);

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
const likePost = asyncHandler(async (req, res, next) => {
  // update the req.params.postid
  const addUserId = await Post.findByIdAndUpdate(
    req.params.postid,
    {
      // push the req.user._id into likes_id array
      $push: { likes_id: req.user._id },
    },

    {
      new: true,
    }
  );
  res.json({ likePost: 'Route works', addUserId });
});
const unlikePost = asyncHandler(async (req, res, next) => {
  // update the req.params.postid
  const removeUserId = await Post.findByIdAndUpdate(
    req.params.postid,
    {
      // pull the req.user._id of of likes_id array
      $pull: { likes_id: req.user._id },
    },

    {
      new: true,
    }
  );

  res.json({ likePost: 'Route works', removeUserId });
});

module.exports = {
  createPost,
  readFeedPosts,
  readUserPosts,
  readPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
