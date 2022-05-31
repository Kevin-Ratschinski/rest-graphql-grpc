'use strict';

const { Router } = require('express');

const userController = require('../controller/user.controller');

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *      properties:
 *        id:
 *          type: integer
 *          description: Auto-generated id of the user.
 *        first_name:
 *          type: string
 *          description: First name of the user.
 *        last_name:
 *          type: string
 *          description: Last name of the user.
 *        email:
 *          type: string
 *          description: Email address of the user.
 *      example:
 *        first_name: Markos
 *        last_name: O'Sirin
 *        email: mosirin0@vk.com
 */

/**
 * @openapi
 * tags:
 *  name: Users
 *  description: API to manage the users.
 */

/**
 * @openapi
 * path:
 * /users/:
 *  get:
 *    summary: Lists all the users
 *    tags: [Users]
 *    responses:
 *      "200":
 *        description: The list of users.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/users', userController.getUsers);

/**
 * @openapi
 * path:
 * /user/{id}:
 *  get:
 *    summary: Gets a user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    responses:
 *      "200":
 *        description: The user by id.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "404":
 *        description: User not found.
 */
router.get('/user/:id', userController.getUser);

/**
 * @openapi
 * path:
 * /user/:
 *  post:
 *    summary: Creates a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      "200":
 *        description: The created user.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post('/user', userController.createUser);

/**
 * @openapi
 * path:
 * /user/{id}:
 *  put:
 *    summary: Updates a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      "204":
 *        description: Update was successful.
 *      "404":
 *        description: User not found.
 */
router.put('/user/:id', userController.updateUser);

/**
 * @openapi
 * path:
 * /user/{id}:
 *  delete:
 *    summary: Deletes a user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    responses:
 *      "204":
 *        description: Delete was successful.
 *      "404":
 *        description: User not found.
 */
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
