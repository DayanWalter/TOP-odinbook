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
router.get('/all', userController.readUsers);
// read single user
router.get('/:userid', userController.readUserById);
// change user
router.put('/update', userController.updateUser);
// delete user
router.delete('/delete', userController.deleteUser);
// follow user
router.put('/:userid/follow', userController.followUser);
// unfollow user
router.put('/:userid/unfollow', userController.unFollowUser);

module.exports = router;
