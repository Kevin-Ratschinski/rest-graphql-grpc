const { Router } = require('express');

const userController = require('../controller/user.controller');

const router = Router();

router.get('/users', userController.getUsers);

router.get('/user/:id', userController.getUser);

router.post('/user', userController.createUser);

router.put('/user/:id', userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

module.exports = router;
