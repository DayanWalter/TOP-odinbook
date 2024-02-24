const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// create new post
router.post('/create', postController.createPost);
// read feed posts
router.get('/feed', postController.readFeedPosts);
// read user posts
router.get('/user/:userid', postController.readUserPosts);
// read single post
router.get('/:postid', postController.readPostById);
// change post
router.put('/:postid/update', postController.updatePost);
// delete post
router.delete('/:postid/delete', postController.deletePost);
// like post
router.put('/:postid/like', postController.likePost);
// unlike post
router.put('/:postid/unlike', postController.unlikePost);

module.exports = router;
