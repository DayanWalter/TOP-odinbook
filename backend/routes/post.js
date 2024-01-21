const express = require('express');
const router = express.Router();
const post_controller = require('../controller/postController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new post
router.post('/create', protectedRoute, post_controller.createPost);
// read all feed posts
router.get('/feed', protectedRoute, post_controller.readAllFeedPosts);
// read all user posts
router.get('/userid/:userid', protectedRoute, post_controller.readAllUserPosts);
// read single post
router.get('/postid/:postid', protectedRoute, post_controller.readPostById);
// change post
router.put('/update', protectedRoute, post_controller.updatePost);
// delete post
router.delete('/delete', protectedRoute, post_controller.deletePost);

module.exports = router;
