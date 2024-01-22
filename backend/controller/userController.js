const asyncHandler = require('express-async-handler');
const User = require('../models/user');
// Validate and sanitize input at createUser
const { body, validationResult } = require('express-validator');
// Hash password at createUser or compare passwords at loginUser
const bcrypt = require('bcryptjs');
// sign token after user logged in
const jwt = require('jsonwebtoken');

/// Helper ///
const generateToken = (user) => {
  // add the _id and the user_name to an object...
  const authenticatedUser = {
    _id: user._id,
    user_name: user.user_name,
  };
  // Sign with the object the token, so you can use later both: _id AND user_name
  return jwt.sign(authenticatedUser, process.env.ACCESS_TOKEN_SECRET);
};

/// CRUD Operations ///
const loginUser = asyncHandler(async (req, res, next) => {
  //Take the user_name and password from body
  const { user_name, password } = req.body;
  // Search for a user with the entered user_name
  const user = await User.findOne({ user_name });
  // Compare the entered password with the hashed password in the database
  const passwordsMatch = await bcrypt.compare(password, user.password);
  // If the passwords match...
  if (passwordsMatch) {
    // Generate a token
    const token = generateToken(user);
    // send a success message and the token to the client
    res.json({ userLogin: 'Success', token });
  } else {
    // else send a failure message to the client
    res.json({ userLogin: 'Failure' });
  }
});
const createUser = [
  /// Validate and sanitize input ///
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
      // create new User with hashed password
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          user_name: req.body.user_name,
          email: req.body.email,
          password: hashedPassword,
        });
        // After successful creation, save user in database
        user.save();
        res.json({ createUser: 'Success', user });
      });
      // send success message to client
    } else {
      // List all errors in the console
      result.array().map((error) => console.log(error.msg));
      // Send failure message to client and the error object
      res.status(404).json({ createUser: 'Failure', result });
    }
  }),
];
const readAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find()
    // Projection(just send to client the following:)
    .select('user_name')
    .exec();
  // Send data to client
  res.json({ allUsers });
});
const readUserById = asyncHandler(async (req, res, next) => {
  const searchedUser = await User.findById(req.params.userid)
    // Projection(just send to client the following:)
    .select('user_name')
    .exec();
  // Send data to client
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
// follow a user
const followUser = asyncHandler(async (req, res, next) => {
  // update the req.user._id
  const addUserFollowsId = await User.findByIdAndUpdate(
    req.user._id,
    {
      // push the req.params.userid into req.user._id follows_id array
      $push: { follows_id: req.params.userid },
    },

    {
      new: true,
    }
  );
  // update the req.params.userid
  const addUserFollowerId = await User.findByIdAndUpdate(
    req.params.userid,
    {
      // push req.user._id into req.params.userid follower_id array
      $push: { follower_id: req.user._id },
    },

    {
      new: true,
    }
  );
  res.json({ addUserFollowsId, addUserFollowerId });
});
// follow a user
const unFollowUser = asyncHandler(async (req, res, next) => {
  // update the req.user._id
  const removeUserFollowsId = await User.findByIdAndUpdate(
    req.user._id,
    {
      // pull req.params.userid out of req.user._id follows_id array
      $pull: { follows_id: req.params.userid },
    },
    {
      new: true,
    }
  );
  // update the req.params.userid
  const removeUserFollowerId = await User.findByIdAndUpdate(
    req.params.userid,
    {
      // pull req.user._id out of req.params.userid follower_id array
      $pull: { follower_id: req.user._id },
    },
    {
      new: true,
    }
  );
  res.json({ removeUserFollowsId, removeUserFollowerId });
});

module.exports = {
  loginUser,
  createUser,
  readAllUsers,
  readUserById,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
};
