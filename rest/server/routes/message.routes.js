'use strict';

const { Router } = require('express');

const messageController = require('../controller/message.controller');

const router = Router();

router.get('/messages', messageController.getMessages);

router.get('/message/:id', messageController.getMessage);

router.get('/messages/:userId', messageController.getUserMessages);

router.post('/message', messageController.createMessage);

router.put('/message/:id', messageController.updateMessage);

router.delete('/message/:id', messageController.deleteMessage);

module.exports = router;
