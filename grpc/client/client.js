'use strict';

require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const USER_PROTO_PATH = path.join(__dirname, '../user.proto');

const packageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const address = process.env.GRPC_SERVER_ADDRESS;
const port = process.env.GRPC_SERVER_PORT;

const client = new UserService(
  `${address}:${port}`,
  grpc.credentials.createInsecure()
);

module.exports = client;
