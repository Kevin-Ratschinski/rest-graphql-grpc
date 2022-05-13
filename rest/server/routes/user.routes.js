const { Router } = require('express');

let users = require('../../../data/users.json');

const router = Router();

router.get('/users', (req, res) => {
  return res.json(users);
});

router.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  return res.json(users[userId]);
});

router.post('/user', (req, res) => {
  return res.json('Received a POST HTTP method');
});

router.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  return res.json('Received a PUT HTTP method');
});

router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  return res.json('Received a DELETE HTTP method');
});

module.exports = router;
