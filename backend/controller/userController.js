const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
// Hash password at createUser
const bcrypt = require('bcryptjs');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().exec();
  // Modify data which is sent to the frontend(without password etc.)
  res.json({ allUsers });
});
const getUserById = asyncHandler(async (req, res, next) => {
  const searchedUser = await User.findById(req.params.id).exec();
  // Modify data which is sent to the frontend(without password etc.)
  res.json({ searchedUser });
});
const createUser = [
  // Validate and sanitize input
  // user_name under 6 characters
  body('user_name', 'Name must be at least 6 characters long')
    .trim()
    .isLength({ min: 6 })
    .escape(),
  // Username already in use
  body('user_name').custom(async (value) => {
    const user = await User.find({ user_name: value });
    if (user) {
      throw new Error('Username already in use');
    }
  }),
  // Email must not be empty
  body('email', 'Email must not be empty').isLength({ min: 5 }).escape(),
  // Email already in use
  body('email').custom(async (value) => {
    const user = await User.find({ email: value });
    if (user) {
      throw new Error('E-mail already in use');
    }
  }),
  // Email format invalid
  body('email').custom(async (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
  }),
  // Password under 6 characters
  body('password', 'Password must be at least 6 characters long').isLength({
    min: 6,
  }),

  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    // If no errors:
    if (result.isEmpty()) {
      // create new User
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          user_name: req.body.user_name,
          email: req.body.email,
          // hash password
          password: hashedPassword,
        });
        console.log(user);
        user.save();
        // After successful creation, save user in database...
      });
      // ...and send message to frontend
      res.json({ createUser: 'Success' });
    } else {
      result.array().map((error) => console.log(error.msg));
      res.status(404).json({ createUser: 'Failure', result });
    }
  }),
];
const updateUser = function (req, res, next) {
  // take the id from the params(later from jwt)
  const userId = +req.params.userid;
  // search in the db(allUsers) for a specific user id
  const searchedUser = allUsers.find((user) => user.id === userId);

  if (!searchedUser) {
    res.status(404).json({ error: 'User does not exist' });
  }

  const { ...changedFields } = req.body;

  const changedUser = { ...searchedUser, ...changedFields };

  res.json({ changedUser });
};
const deleteUser = function (req, res, next) {
  // take the id from the params(later from jwt)
  const idToDelete = +req.params.userid;
  // search in the db(allUsers) for a specific user id
  const deletedUser = allUsers.find((user) => user.id === idToDelete);
  // update db(filter user out)
  const newAllUsers = allUsers.filter((user) => user.id !== idToDelete);
  // console.log(newAllUsers);
  if (!deletedUser) {
    res.status(404).json({ error: 'User does not exist' });
  }

  res.json({ newAllUsers });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
