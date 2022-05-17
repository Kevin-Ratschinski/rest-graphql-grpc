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

  User: {
    messages: (user) => {
      return messages.filter((message) => message.userId == user.id);
    },
  },
};

module.exports = userResolvers;
