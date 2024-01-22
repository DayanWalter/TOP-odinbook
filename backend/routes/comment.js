const express = require('express');
const router = express.Router();
const comment_controller = require('../controller/commentController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new comment
router.post(
  '/:postid/create',
  protectedRoute,
  comment_controller.createComment
);
// read post comments
router.get(
  '/post/:postid',
  protectedRoute,
  comment_controller.readPostComments
);
// read user comments
router.get(
  '/user/:userid',
  protectedRoute,
  comment_controller.readUserComments
);
// read single comment
router.get('/:commentid', protectedRoute, comment_controller.readCommentById);
// change comment
router.put(
  '/:commentid/update',
  protectedRoute,
  comment_controller.updateComment
);
// delete comment
router.delete(
  '/:commentid/delete',
  protectedRoute,
  comment_controller.deleteComment
);
// like comment
router.put('/:commentid/like', protectedRoute, comment_controller.likeComment);
// unlike comment
router.put(
  '/:commentid/unlike',
  protectedRoute,
  comment_controller.unlikeComment
);

module.exports = router;
