'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');

const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(messageRoutes);

const address = process.env.REST_SERVER_ADDRESS || 'localhost';
const port = process.env.REST_SERVER_PORT || 5001;

app.listen(port, address, () =>
  console.log(`REST Server listening on ${address}:${port}`)
);
