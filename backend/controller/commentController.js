const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const createComment = [
  body('content').trim().isLength({ max: 200 }).escape(),

  asyncHandler(async (req, res, next) => {
    // Validate and sanitize input(body)
    const result = validationResult(req);
    // If the message is shorter than 200 chars
    if (result.isEmpty()) {
      // Create new comment
      const comment = new Comment({
        // Get the author_id from the jwt
        author_id: req.user._id,
        // Get the content from the body
        content: req.body.content,
        // Get the post_id from the params
        post_id: req.params.postid,
      });
      // Save to database
      await comment.save();

      // Update author
      await User.findByIdAndUpdate(req.user._id, {
        // Push comment._id into comments_id array of author
        $push: { comments_id: comment._id },
      });
      // Update Post
      await Post.findByIdAndUpdate(req.params.postid, {
        // Push comment._id into comments_id array of post
        $push: { comments_id: comment._id },
      });
      // Send comment to client
      res.json({ createComment: 'Route works', comment });
    } else {
      // List all errors in the console
      result.array().map((error) => console.log(error.msg));
      // Send status 404,failure message and result(error object) to client
      res.status(404).json({ createComment: 'Failure', result });
    }
  }),
];
const readPostComments = asyncHandler(async (req, res, next) => {
  // Take postid from params and search for post
  const postComments = await Post.findById(req.params.postid)
    .select('comments_id')
    .populate('comments_id');
  // get the comments_id array
  const comments = postComments.comments_id;
  // Send the comments array to client
  res.json({ readPostComments: 'Route works', comments });
});
const readUserComments = asyncHandler(async (req, res, next) => {
  // Take userid from params and search for user
  const userComments = await User.findById(req.params.userid)
    .select('comments_id')
    .populate('comments_id');
  // get the comments_id array
  const comments = userComments.comments_id;
  // Send the comments array to client
  res.json({ readUserComments: 'Route works', comments });
});
const readCommentById = asyncHandler(async (req, res, next) => {
  // get comment._id from params and search for comment
  const searchedComment = await Comment.findById(req.params.commentid);
  res.json({ readCommentById: 'Route works', searchedComment });
});
const updateComment = asyncHandler(async (req, res, next) => {
  // Check if logged in user wrote the comment
  // Get the comment._id from params and look for the author
  const comment = await Comment.findById(req.params.commentid).select(
    'author_id'
  );
  // If the logged in user is the author of the comment...
  if (comment.author_id.equals(req.user._id)) {
    // Get the content from the body
    const content = req.body.content;
    // Get the id for the comment from the params and update comment
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentid,
      {
        content,
      },
      // Return the changed comment
      {
        new: true,
      }
    );
    // Send the updated comment to client
    res.json({ updateComment: 'Route works', updatedComment });
    return;
  } else {
    // If the logged in user is not the author of the comment, send 404 and message
    res.status(404).json({ updateComment: 'You did not write this comment' });
  }
});
const deleteComment = asyncHandler(async (req, res, next) => {
  // Check if the logged in user wrote the comment
  // Get the comment._id from params and look for the author
  const comment = await Comment.findById(req.params.commentid).select(
    'author_id'
  );
  // If the logged in user is the author of the comment...
  if (comment.author_id.equals(req.user._id)) {
    // Get the id for the comment from the params and delete comment
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentid
    );
    // Find comments_id array from user
    await User.findByIdAndUpdate(
      req.user._id,
      // Remove comment._id from user.comments_id
      { $pull: { comments_id: req.params.commentid } },
      // Return the updated user document
      { new: true }
    );
    // Find comments_id array from post
    await Post.findByIdAndUpdate(
      req.params.postid,
      // Remove comment._id from req.params.postid
      { $pull: { comments_id: req.params.commentid } },
      // Return the updated post document
      { new: true }
    );
    // Send the deleted comment to client
    res.json({ deleteComment: 'Route works', deletedComment });
    return;
  } else {
    // If the logged in user is not the author of the comment, send 404 and message
    res.status(404).json({ deleteComment: 'You did not write this post' });
    return;
  }
});
const likeComment = asyncHandler(async (req, res, next) => {
  // Search for the comment
  const comment = await Comment.findOne({
    _id: req.params.commentid,
    // CHeck if the user is in the likes_id array
    likes_id: { $in: req.user._id },
  });
  // If the user is NOT in the likes_id
  if (!comment) {
    // update the req.params.commentid
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
  } else {
    res.json({ likeComment: 'User already liked comment' });
  }
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
