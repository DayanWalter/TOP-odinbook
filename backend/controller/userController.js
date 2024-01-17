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
const createUser = function (req, res, next) {
  // convert the id into integer
  const id = +req.body.id;
  const name = req.body.name;

  // Search the db for the entered username
  const searchedUser = allUsers.find((user) => user.name === name);
  // if name is in database,...
  if (searchedUser) {
    // ...return status 422 and error
    res.status(422).json({ error: 'Username already exists' });
  }
  // else create newUser
  const newUser = { id, name };
  // and add to database
  allUsers.push(newUser);
  res.json({ newUser });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
