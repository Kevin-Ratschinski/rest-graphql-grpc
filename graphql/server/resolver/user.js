'use strict';

let users = require('../../../data/users_data.json');
let messages = require('../../../data/messages_data.json');

const userResolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (parent, { id }) => {
      return users.find((user) => user.id == id);
    },
  },

  Mutation: {
    createUser: (parent, { first_name, last_name, email }) => {
      let userId;
      if (users.length > 0) {
        userId = +users[users.length - 1].id + 1;
      } else {
        userId = 1;
      }

      const user = {
        id: userId,
        first_name: first_name,
        last_name: last_name,
        email: email,
      };

      users.push(user);

      return user;
    },
    updateUser: (parent, { id, first_name, last_name, email }) => {
      const userId = id;
      const user = users.find((user) => user.id == userId);

      if (user) {
        if (first_name) {
          user.first_name = first_name;
        }
        if (last_name) {
          user.last_name = last_name;
        }
        if (email) {
          user.email = email;
        }
      }

      return user;
    },
    deleteUser: (parent, { id }) => {
      const user = users.find((user) => user.id == id);
      if (!user) {
        return false;
      }

      users = users.filter((user) => {
        return user.id != id;
      });
      return true;
    },
  },

  User: {
    messages: (user) => {
      return messages.filter((message) => message.userId == user.id);
    },
  },
};

module.exports = userResolvers;
