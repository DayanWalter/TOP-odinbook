const allUsers = [
  {
    id: 1,
    name: 'Peter',
  },
  {
    id: 2,
    name: 'Michael',
  },
];

const getAllUsers = function (req, res, next) {
  res.json({ allUsers });
};
const getUserById = function (req, res, next) {
  // search in the db(allUsers) for a specific user id
  const userId = +req.params.userid;
  const searchedUser = allUsers.find((user) => user.id === userId);
  if (!searchedUser) {
    res.status(404).json({ error: 'User does not exist' });
  }
  res.json({ searchedUser });
};

module.exports = {
  getAllUsers,
  getUserById,
};
