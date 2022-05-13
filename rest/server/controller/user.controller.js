let users = require('../../../data/users.json');

function getUsers(req, res, next) {
  return res.json(users);
}

function getUser(req, res, next) {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  return res.json(user);
}

function createUser(req, res, next) {
  let userId;
  if (users.length > 0) {
    userId = (+users[users.length - 1].id + 1).toString();
  } else {
    userId = '1';
  }
  const username = req.body.username;

  const user = {
    id: userId,
    username: username,
  };

  users.push(user);

  return res.json(user);
}

function updateUser(req, res, next) {
  const userId = req.params.id;
  const newUsername = req.body.username;

  const user = users.find((user) => user.id === userId);

  if (user) {
    user.username = newUsername;
  }

  return res.json(user);
}

function deleteUser(req, res, next) {
  const userId = req.params.id;

  users = users.filter((user) => {
    return user.id !== userId;
  });

  return res.json(`Delete user with id:${userId}`);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
