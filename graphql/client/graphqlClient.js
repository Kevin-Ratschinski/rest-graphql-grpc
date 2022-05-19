'use strict';

require('dotenv').config();
const { GraphQLClient } = require('graphql-request');

const address = process.env.GRAPHQL_SERVER_ADDRESS || 'localhost';
const port = process.env.GRAPHQL_SERVER_PORT || 5002;

const GRAPHQL_SERVER = `http://${address}:${port}/graphql`;

const graphqlClient = new GraphQLClient(GRAPHQL_SERVER);

module.exports = graphqlClient;
