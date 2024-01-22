const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
// Validate and sanitize input at createPost
const { body, validationResult } = require('express-validator');
// TODO: Validate and sanitize
const createComment = asyncHandler(async (req, res, next) => {
  // Validate and sanitize input(body)
  const comment = new Comment({
    author_id: req.user._id,
    content: req.body.content,
    post_id: req.params.postid,
  });
  // Save to database
  await comment.save();

  // Add comment._id to user._id
  await User.findByIdAndUpdate(req.user._id, {
    $push: { comments_id: comment._id },
  });
  // Add comment._id to post._id
  await Post.findByIdAndUpdate(req.params.postid, {
    $push: { comments_id: comment._id },
  });

  res.json({ createComment: 'Route works', comment });
});
const readPostComments = asyncHandler(async (req, res, next) => {
  // Take userid from params
  const postComments = await Post.findById(req.params.postid)
    .select('comments_id')
    .populate('comments_id');

  res.json({ readPostComments: 'Route works', postComments });
});
const readUserComments = asyncHandler(async (req, res, next) => {
  // Take userid from params
  const userComments = await User.findById(req.params.userid)
    .select('comments_id')
    .populate('comments_id');

  res.json({ readUserComments: 'Route works', userComments });
});
const readCommentById = asyncHandler(async (req, res, next) => {
  const searchedComment = await Comment.findById(req.params.commentid);
  res.json({ readCommentById: 'Route works', searchedComment });
});
const updateComment = asyncHandler(async (req, res, next) => {
  // Check if logged in user wrote the post
  const comment = await Comment.findById(req.params.commentid).select(
    'author_id'
  );

  if (comment.author_id.equals(req.user._id)) {
    const content = req.body.content;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentid,
      {
        content,
      },
      {
        new: true,
      }
    );

    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ updateComment: 'Route works', updatedComment });
  } else {
    res.json({ updateComment: 'You did not write this comment' });
  }
});
const deleteComment = asyncHandler(async (req, res, next) => {
  // Check if the logged in user wrote the post
  const comment = await Comment.findById(req.params.commentid).select(
    'author_id'
  );

  if (comment.author_id.equals(req.user._id)) {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentid
    );

    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    // Remove comment._id from user.comments_id
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { comments_id: req.params.commentid } },
      { new: true } // Return the updated user document
    );
    // Remove comment._id from req.params.postid
    await Post.findByIdAndUpdate(
      req.params.postid,
      { $pull: { comments_id: req.params.commentid } },
      { new: true } // Return the updated user document
    );

    res.json({ deleteComment: 'Route works', deletedComment });
    return;
  } else {
    res.json({ deleteComment: 'You did not write this post' });
    return;
  }
});
// TODO:
const likeComment = asyncHandler(async (req, res, next) => {
  // update the req.params.postid
  const addUserId = await Comment.findByIdAndUpdate(
    req.params.commentid,
    {
      // push the req.user._id into likes_id array
      $push: { likes_id: req.user._id },
    },

    {
      new: true,
    }
  );
  res.json({ likeComment: 'Route works', addUserId });
});
const unlikeComment = asyncHandler(async (req, res, next) => {
  // update the req.params.commentid
  const removeUserId = await Comment.findByIdAndUpdate(
    req.params.commentid,
    {
      // pull the req.user._id of of likes_id array
      $pull: { likes_id: req.user._id },
    },

    {
      new: true,
    }
  );

  res.json({ likeComment: 'Route works', removeUserId });
});

module.exports = {
  createComment,
  readPostComments,
  readUserComments,
  readCommentById,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
