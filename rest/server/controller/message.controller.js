const { v4: uuidv4 } = require('uuid');

let messages = require('../../../data/messages.json');

function getMessages(req, res, next) {
  return res.json(messages);
}

function getMessage(req, res, next) {
  const messageId = req.params.id;
  const message = messages.find((message) => message.id === messageId);

  return res.json(message);
}

function createMessage(req, res, next) {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.body.userId,
  };

  messages.push(message);

  return res.json(message);
}

function updateMessage(req, res, next) {
  const messageId = req.params.id;
  const newText = req.body.text;

  const message = messages.find((message) => message.id === messageId);

  if (message) {
    message.text = newText;
  }

  return res.json(message);
}

function deleteMessage(req, res, next) {
  const messageId = req.params.id;

  messages = messages.filter((message) => {
    return message.id !== messageId;
  });

  return res.json(`Delete message with id:${messageId}`);
}

module.exports = {
  getMessages: getMessages,
  getMessage: getMessage,
  createMessage: createMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage,
};
