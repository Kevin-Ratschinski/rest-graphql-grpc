'use strict';

const { Router } = require('express');

const messageController = require('../controller/message.controller');

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      required:
 *        - text
 *        - userId
 *      properties:
 *        id:
 *          type: integer
 *          description: Auto-generated id of the message.
 *        text:
 *          type: string
 *          description: Message text.
 *        userId:
 *          type: integer
 *          description: Id of the user who created the message.
 *      example:
 *        text: Nulla tempus.
 *        userId: 322
 */

/**
 * @openapi
 * tags:
 *  name: Messages
 *  description: API to manage the messages.
 */

/**
 * @openapi
 * path:
 * /messages/:
 *  get:
 *    summary: Lists all the messages
 *    tags: [Messages]
 *    responses:
 *      "200":
 *        description: The list of messages.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */
router.get('/messages', messageController.getMessages);

/**
 * @openapi
 * path:
 * /message/{id}:
 *  get:
 *    summary: Gets a message by id
 *    tags: [Messages]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The message id
 *    responses:
 *      "200":
 *        description: The message by id.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      "404":
 *        description: Message not found.
 */
router.get('/message/:id', messageController.getMessage);

/**
 * @openapi
 * path:
 * /messages/{userId}:
 *  get:
 *    summary: Gets all messages from user
 *    tags: [Messages]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    responses:
 *      "200":
 *        description: The messages from user.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      "404":
 *        description: User not found.
 */
router.get('/messages/:userId', messageController.getUserMessages);

/**
 * @openapi
 * path:
 * /message/:
 *  post:
 *    summary: Creates a new message
 *    tags: [Messages]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Message'
 *    responses:
 *      "200":
 *        description: The created message.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */
router.post('/message', messageController.createMessage);

/**
 * @openapi
 * path:
 * /message/{id}:
 *  put:
 *    summary: Updates a message
 *    tags: [Messages]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The message id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Message'
 *    responses:
 *      "204":
 *        description: Update was successful.
 *      "404":
 *        description: Message not found.
 */
router.put('/message/:id', messageController.updateMessage);

/**
 * @openapi
 * path:
 * /message/{id}:
 *  delete:
 *    summary: Deletes a message by id
 *    tags: [Messages]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The message id
 *    responses:
 *      "204":
 *        description: Delete was successful.
 *      "404":
 *        description: Message not found.
 */
router.delete('/message/:id', messageController.deleteMessage);

module.exports = router;
