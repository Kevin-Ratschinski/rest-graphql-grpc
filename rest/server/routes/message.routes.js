const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');

let messages = require('../../../data/messages.json');

const router = Router();

router.get('/messages', (req, res) => {
  return res.json(messages);
});

router.get('/message/:id', (req, res) => {
  const messageId = req.params.id;

  return res.json(messages[messageId]);
});

router.post('/message', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.json(message);
});

router.delete('/message/:id', (req, res) => {
  const { [req.params.id]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});

module.exports = router;
