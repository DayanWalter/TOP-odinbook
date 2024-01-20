const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().exec();
  res.json({ allUsers });
});
const getUserById = asyncHandler(async (req, res, next) => {
  const searchedUser = await User.findById(req.params.id).exec();
  res.json({ searchedUser });
});
const createUser = asyncHandler(async (req, res, next) => {
  // Validate and sanitize input
  // If no errors:
  // create new User
  const user = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    // hash password
    password: req.body.password,
  });
  // After successful creation, save user in database...

  // ...and send message to frontend
  res.json({ createUser: 'Success' });
});

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
