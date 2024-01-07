const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');

// get all users
router.get('/', user_controller.getAllUsers);
// get single user
router.get('/:userid', user_controller.getUserById);
module.exports = router;
