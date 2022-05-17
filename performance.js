'use strict';
const axios = require('axios');
const grpcClient = require('./grpc/client/client');
const { performance, PerformanceObserver } = require('perf_hooks');

const REQUEST_COUNT = 1000;

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

observer.observe({ entryTypes: ['measure'], buffer: true });

const performanceRest = async (endpoint) => {
  try {
    performance.mark('rest-start');
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      await axios.get(`http://localhost:5001${endpoint}`);
    }
  } catch (err) {
    throw new Error(err);
  }
  performance.mark('rest-end');

  performance.measure(
    `REST http://localhost:5001${endpoint}`,
    'rest-start',
    'rest-end'
  );
};

const getAllUsers = (...args) => {
  return new Promise((resolve, reject) => {
    grpcClient.getAllUsers(...args, (error, users) => {
      if (error) return reject(error);
      resolve(users);
    });
  });
};

const performanceGRPC = async () => {
  try {
    performance.mark('grpc-start');
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      await getAllUsers({});
    }
  } catch (err) {
    throw new Error(err);
  }
  performance.mark('grpc-end');

  performance.measure(`gRPC http://localhost:5000`, 'grpc-start', 'grpc-end');
};

const performanceGRPCAsync = async () => {
  let count = 0;
  try {
    performance.mark('grpc-start');
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      getAllUsers({}).then(() => {
        count++;

        if (count == REQUEST_COUNT) {
          performance.mark('grpc-end');

          performance.measure(
            `gRPC async http://localhost:5000`,
            'grpc-start',
            'grpc-end'
          );
        }
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

(async () => {
  await performanceRest('/users');
  //await performanceRest('/user/1');
  //await performanceRest('/messages');
  await performanceGRPC();
  await performanceGRPCAsync();
})();
