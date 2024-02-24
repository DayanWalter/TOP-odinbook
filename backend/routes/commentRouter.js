const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new comment
router.post('/:postid/create', commentController.createComment);
// read post comments
router.get('/post/:postid', commentController.readPostComments);
// read user comments
router.get('/user/:userid', commentController.readUserComments);
// read single comment
router.get('/:commentid', commentController.readCommentById);
// change comment
router.put(
  '/:commentid/update',

  commentController.updateComment
);
// delete comment
router.delete(
  '/:commentid/delete',

  commentController.deleteComment
);
// like comment
router.put('/:commentid/like', commentController.likeComment);
// unlike comment
router.put(
  '/:commentid/unlike',

  commentController.unlikeComment
);

module.exports = router;
