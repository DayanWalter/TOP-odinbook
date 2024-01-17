const allUsers = [
  {
    id: 1,
    user_name: 'Peter',
    email: 'Peter@mail.com',
    password: '123',
    img_url: 'http://example.com',
    follower_id: [],
    follows_id: [],
  },
  {
    id: 2,
    user_name: 'Michael',
    email: 'Michael@mail.com',
    password: '123',
    img_url: 'http://example.com',
    follower_id: [],
    follows_id: [],
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
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const img_url = 'http://example.com';
  const follower_id = [];
  const follows_id = [];

  // Search the db for the entered username
  const searchedUser = allUsers.find((user) => user.user_name === user_name);
  // if name is in database,...
  if (searchedUser) {
    // ...return status 422 and error
    res.status(422).json({ error: 'Username already exists' });
  }
  // else create newUser
  const newUser = {
    id,
    user_name,
    email,
    password,
    img_url,
    follower_id,
    follows_id,
  };
  // and add to database
  allUsers.push(newUser);
  res.json({ newUser });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
