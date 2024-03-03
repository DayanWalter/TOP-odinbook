const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new comment
router.post('/:postid/create', protectedRoute, commentController.createComment);
// read post comments
router.get('/post/:postid', protectedRoute, commentController.readPostComments);
// read user comments
router.get('/user/:userid', protectedRoute, commentController.readUserComments);
// read single comment
router.get('/:commentid', protectedRoute, commentController.readCommentById);
// change comment
router.put(
  '/:commentid/update',
  protectedRoute,
  commentController.updateComment
);
// delete comment
router.delete(
  '/:commentid/post/:postid/delete',
  protectedRoute,
  commentController.deleteComment
);
// like comment
router.put('/:commentid/like', protectedRoute, commentController.likeComment);
// unlike comment
router.put(
  '/:commentid/unlike',
  protectedRoute,
  commentController.unlikeComment
);

module.exports = router;
