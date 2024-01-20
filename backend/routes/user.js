const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// login user
router.post('/login', user_controller.loginUser);
// create new user
router.post('/', user_controller.createUser);
// read all users
router.get('/all', protectedRoute, user_controller.readAllUsers);
// read single user
router.get('/:userid', protectedRoute, user_controller.readUserById);
// change user
router.put('/', protectedRoute, user_controller.updateUser);
// delete user
router.delete('/:userid', protectedRoute, user_controller.deleteUser);
module.exports = router;
