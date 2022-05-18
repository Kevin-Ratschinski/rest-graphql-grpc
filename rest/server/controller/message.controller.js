'use strict';

let messages = require('../../../data/messages_data.json');

function getMessages(req, res, next) {
  return res.json(messages);
}

function getMessage(req, res, next) {
  const messageId = req.params.id;
  const message = messages.find((message) => message.id == messageId);

  return res.json(message);
}

function getUserMessages(req, res, next) {
  const userId = req.params.userId;
  const userMessages = messages.filter((message) => message.userId == userId);

  return res.json(userMessages);
}

function createMessage(req, res, next) {
  let messageId;
  if (messages.length > 0) {
    messageId = +messages[messages.length - 1].id + 1;
  } else {
    messageId = 1;
  }

  const message = {
    id: messageId,
    text: req.body.text,
    userId: req.body.userId,
  };

  messages.push(message);

  return res.json(message);
}

function updateMessage(req, res, next) {
  const messageId = req.params.id;
  const newText = req.body.text;

  const message = messages.find((message) => message.id == messageId);

  if (message) {
    message.text = newText;
  }

  return res.json(message);
}

function deleteMessage(req, res, next) {
  const messageId = req.params.id;

  messages = messages.filter((message) => {
    return message.id != messageId;
  });

  return res.json(`Delete message with id: ${messageId}`);
}

module.exports = {
  getMessages: getMessages,
  getMessage: getMessage,
  getUserMessages: getUserMessages,
  createMessage: createMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage,
};
