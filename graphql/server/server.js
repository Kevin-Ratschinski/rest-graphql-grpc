'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());

const schema = require('./schema');
const resolvers = require('./resolver');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const address = process.env.GRAPHQL_SERVER_ADDRESS || 'localhost';
const port = process.env.GRAPHQL_SERVER_PORT || 5002;

async function startServer() {
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(port, address, () =>
    console.log(`GraphQl Server listening on ${address}:${port}`)
  );
}

startServer();
