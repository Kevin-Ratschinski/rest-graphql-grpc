'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const spdy = require('spdy');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const address = process.env.REST_SERVER2_ADDRESS || 'localhost';
const port = process.env.REST_SERVER2_PORT || 5004;

const cert = fs.readFileSync(path.join(__dirname, 'certificate.crt'));
const key = fs.readFileSync(path.join(__dirname, 'private.key'));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://${address}:${port}/`,
      },
    ],
  },
  apis: ['rest/server/routes/*.routes.js'],
};

const specs = swaggerJsdoc(options);

const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(messageRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const server = spdy.createServer({ cert, key }, app);

server.listen(port, address, () =>
  console.log(`REST Server listening on ${address}:${port}`)
);
