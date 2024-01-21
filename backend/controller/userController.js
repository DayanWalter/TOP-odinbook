const asyncHandler = require('express-async-handler');
const User = require('../models/user');
// Validate and sanitize input at createUser
const { body, validationResult } = require('express-validator');
// Hash password at createUser or compare passwords at loginUser
const bcrypt = require('bcryptjs');
// sign token after user logged in
const jwt = require('jsonwebtoken');

const loginUser = asyncHandler(async (req, res, next) => {
  const { user_name, password } = req.body;
  const user = await User.findOne({ user_name });
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (passwordsMatch) {
    const authenticatedUser = {
      _id: user._id,
      user_name,
    };
    console.log(authenticatedUser);

    const token = jwt.sign(authenticatedUser, process.env.ACCESS_TOKEN_SECRET);

    res.json({ userLogin: 'Success', token });
  } else {
    res.json({ userLogin: 'Failure' });
  }
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
    const user = await User.findOne({ user_name: value });
    if (user) {
      throw new Error('Username already in use');
    }
  }),
  // Email must not be empty
  body('email', 'Email must not be empty').isLength({ min: 5 }).escape(),
  // Email already in use
  body('email').custom(async (value) => {
    const user = await User.findOne({ email: value });
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
          password: hashedPassword,
        });
        console.log(user);
        // After successful creation, save user in database...
        user.save();
      });
      // ...and send message to frontend
      res.json({ createUser: 'Success' });
    } else {
      result.array().map((error) => console.log(error.msg));
      res.status(404).json({ createUser: 'Failure', result });
    }
  }),
];
const readAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find()
    // Projection(just send to frontend the following:)
    .select('user_name')
    .exec();
  // Modify data which is sent to the frontend(without password etc.)
  res.json({ allUsers });
});
const readUserById = asyncHandler(async (req, res, next) => {
  const searchedUser = await User.findById(req.params.userid)
    // Projection(just send to frontend the following:)
    .select('user_name')
    .exec();
  // Modify data which is sent to the frontend(without password etc.)
  res.json({ searchedUser });
});
const updateUser = asyncHandler(async (req, res, next) => {
  // take the id from jwt
  const userId = req.user._id;
  // take changes from body

  const { user_name, email, img_url } = req.body;
  // TEST IF THE EMAIL AND USERNAME FROM BODY ARE NOT ALREADY TAKEN!!!

  // search in the db(allUsers) for a specific user id
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      user_name,
      email,
      img_url,
    },
    {
      new: true,
    }
  ).exec();

  if (!updatedUser) {
    res.status(404).json({ error: 'User does not exist' });
    return;
  }

  res.json({ updatedUser });
});
const deleteUser = asyncHandler(async (req, res, next) => {
  // take the id from jwt
  const userIdToDelete = req.user._id;
  const deletedUser = await User.findByIdAndDelete(userIdToDelete).exec();
  if (!deletedUser) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ deletedUser });
});

module.exports = {
  loginUser,
  createUser,
  readAllUsers,
  readUserById,
  updateUser,
  deleteUser,
};
