'use strict';

let users = require('../../../data/users_data.json');
let messages = require('../../../data/messages_data.json');

const messageResolvers = {
  Query: {
    messages: () => {
      return messages;
    },
    message: (parent, { id }) => {
      return messages.find((message) => message.id == id);
    },
  },

  Mutation: {
    createMessage: (parent, { text, userId }) => {
      let messageId;
      if (messages.length > 0) {
        messageId = +messages[messages.length - 1].id + 1;
      } else {
        messageId = 1;
      }

      const message = {
        id: messageId,
        text,
        userId,
      };

      messages.push(message);

      return message;
    },
    updateMessage: (parent, { id, text }) => {
      const messageId = id;
      const newText = text;

      const message = messages.find((message) => message.id == messageId);

      if (message) {
        message.text = newText;
      }

      return message;
    },
    deleteMessage: (parent, { id }) => {
      const message = messages.find((message) => message.id == id);
      if (!message) {
        return false;
      }

      messages = messages.filter((message) => {
        return message.id != id;
      });
      return true;
    },
  },

  Message: {
    user: (message) => {
      return users.find((user) => user.id == message.userId);
    },
  },
};

module.exports = messageResolvers;
