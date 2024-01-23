const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// login user
router.post('/login', userController.loginUser);
// create new user
router.post('/create', userController.createUser);
// read all users
router.get('/all', protectedRoute, userController.readUsers);
// read single user
router.get('/:userid', protectedRoute, userController.readUserById);
// change user
router.put('/update', protectedRoute, userController.updateUser);
// delete user
router.delete('/delete', protectedRoute, userController.deleteUser);
// follow user
router.put('/:userid/follow', protectedRoute, userController.followUser);
// unfollow user
router.put('/:userid/unfollow', protectedRoute, userController.unFollowUser);

module.exports = router;
