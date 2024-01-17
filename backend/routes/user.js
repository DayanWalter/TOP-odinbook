const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');

// get all users
router.get('/', user_controller.getAllUsers);
// get single user
router.get('/:userid', user_controller.getUserById);
// create new user
router.post('/', user_controller.createUser);
// change user
router.put('/:userid', user_controller.updateUser);
module.exports = router;
