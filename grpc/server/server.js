'use strict';

require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const USER_PROTO_PATH = path.join(__dirname, '../user.proto');

let usersData = require('../../data/users_data.json');
let messagesData = require('../../data/messages_data.json');

const packageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  getAllUsers: (_, cb) => {
    cb(null, { users: [...usersData] });
  },

  getUser: (_, cb) => {
    const userId = _.request.id;
    const user = usersData.find(({ id }) => id == userId);
    cb(null, user);
  },

  addUser: (_, cb) => {
    let userId;
    if (usersData.length > 0) {
      userId = +usersData[usersData.length - 1].id + 1;
    } else {
      userId = 1;
    }

    const user = { id: userId, ..._.request };
    usersData.push(user);
    cb(null, user.id);
  },

  deleteUser: (_, cb) => {
    const userId = _.request.id;
    usersData = usersData.filter(({ id }) => id != userId);
    cb(null, {});
  },

  editUser: (_, cb) => {
    const userId = _.request.id;
    const user = usersData.find(({ id }) => id == userId);
    if (user) {
      user.first_name = _.request.first_name;
      user.last_name = _.request.last_name;
      user.email = _.request.email;
    }
    cb(null, user);
  },

  getAllMessages: (_, cb) => {
    cb(null, { messages: [...messagesData] });
  },

  getMessage: (_, cb) => {
    const messageId = _.request.id;
    const message = messagesData.find(({ id }) => id == messageId);
    cb(null, message);
  },

  getUserMessages: (_, cb) => {
    const id = _.request.id;
    const messages = messagesData.filter(({ userId }) => userId == id);
    cb(null, { messages: [...messages] });
  },

  addMessage: (_, cb) => {
    let messageId;
    if (messagesData.length > 0) {
      messageId = +messagesData[messagesData.length - 1].id + 1;
    } else {
      messageId = 1;
    }

    const message = { id: messageId, ..._.request };
    messagesData.push(message);
    cb(null, message.id);
  },

  deleteMessage: (_, cb) => {
    const messageId = _.request.id;
    messagesData = messagesData.filter(({ id }) => id != messageId);
    cb(null, {});
  },

  editMessage: (_, cb) => {
    const messageId = _.request.id;
    const message = messagesData.find(({ id }) => id == messageId);
    if (message) {
      message.text = _.request.text;
    }
    cb(null, message);
  },
});

const address = process.env.GRPC_SERVER_ADDRESS;
const port = process.env.GRPC_SERVER_PORT;

server.bindAsync(
  `${address}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`gRPC Server listening on ${address}:${port}`);
      server.start();
    }
  }
);
