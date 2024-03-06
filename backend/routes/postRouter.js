const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new post
router.post('/create', protectedRoute, postController.createPost);
// read feed posts
router.get('/feed', protectedRoute, postController.readFeedPosts);
// read user posts
router.get('/user/:userid', protectedRoute, postController.readUserPosts);
// read single post
router.get('/:postid', protectedRoute, postController.readPostById);
// change post
router.put('/:postid/update', protectedRoute, postController.updatePost);
// delete post
router.delete('/:postid/delete', protectedRoute, postController.deletePost);
// like post
router.put('/:postid/like', protectedRoute, postController.likePost);
// unlike post
router.put('/:postid/unlike', protectedRoute, postController.unlikePost);

module.exports = router;
