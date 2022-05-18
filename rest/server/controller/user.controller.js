'use strict';

let users = require('../../../data/users_data.json');

function getUsers(req, res, next) {
  return res.json(users);
}

function getUser(req, res, next) {
  const userId = req.params.id;
  const user = users.find((user) => user.id == userId);

  return res.json(user);
}

function createUser(req, res, next) {
  let userId;
  if (users.length > 0) {
    userId = +users[users.length - 1].id + 1;
  } else {
    userId = 1;
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const user = {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };

  users.push(user);

  return res.json(user);
}

function updateUser(req, res, next) {
  const userId = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const user = users.find((user) => user.id == userId);

  if (user) {
    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;
  }

  return res.json(user);
}

function deleteUser(req, res, next) {
  const userId = req.params.id;

  users = users.filter((user) => {
    return user.id != userId;
  });

  return res.json(`Delete user with id: ${userId}`);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
