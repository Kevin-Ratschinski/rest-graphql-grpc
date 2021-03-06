'use strict';

require('dotenv').config();
const MessageClient = require('../client/MessageClient');
const { performance, PerformanceObserver } = require('perf_hooks');
const UserClient = require('../client/UserClient');

let REQUEST_COUNT = process.env.REQUEST_COUNT || 100;

const messageClient = new MessageClient();
const userClient = new UserClient();

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const result = {
      Measure: `${entry.detail} ${entry.name}`,
      Requests: +REQUEST_COUNT,
      DurationMs: +entry.duration.toFixed(4),
      DurationSec: +(entry.duration / 1000).toFixed(4),
    };

    console.log('gRPC Performance Test');
    console.log(result);
    console.log();
  });
});

observer.observe({ entryTypes: ['measure'], buffer: true });

const address = process.env.GRPC_SERVER_ADDRESS || 'localhost';
const port = process.env.GRPC_SERVER_PORT || 5000;

const performanceGRPC = async (description, clientFunction) => {
  try {
    performance.mark('grpc-start');
    const promises = [];
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      promises.push(clientFunction());
    }
    await Promise.all(promises).then(() => {
      performance.mark('grpc-end');

      performance.measure(`http://${address}:${port}`, {
        start: 'grpc-start',
        end: 'grpc-end',
        detail: description,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const performanceGRPCMessagesFromUsers = async (description) => {
  try {
    performance.mark('grpc-start');
    const promises = [];
    const users = await userClient.getAllUsers();

    for (const key in users.users) {
      const userId = users.users[key].id;
      promises.push(messageClient.getUserMessages(userId));
    }
    await Promise.all(promises).then(() => {
      REQUEST_COUNT = 1001;
      performance.mark('grpc-end');

      performance.measure(`http://${address}:${port}`, {
        start: 'grpc-start',
        end: 'grpc-end',
        detail: description,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await performanceGRPC('Get all Users', userClient.getAllUsers);
  await performanceGRPC('Get User', userClient.getUser.bind(null, 1));
  await performanceGRPC('Get all Messages', messageClient.getAllMessages);
  await performanceGRPC('Get Messages', messageClient.getMessage.bind(null, 1));
  await performanceGRPCMessagesFromUsers('Get Messages from all Users');
  /*  await performanceGRPC(
    'Create a User',
    userClient.addUser.bind(null, 'test', 'test', 'test@test.com')
  ); */
})();
