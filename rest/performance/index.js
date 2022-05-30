'use strict';

require('dotenv').config();
const axios = require('axios');
const { performance, PerformanceObserver } = require('perf_hooks');

let REQUEST_COUNT = process.env.REQUEST_COUNT || 100;

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const result = {
      Measure: `${entry.detail} ${entry.name}`,
      Requests: +REQUEST_COUNT,
      DurationMs: +entry.duration.toFixed(4),
      DurationSec: +(entry.duration / 1000).toFixed(4),
    };

    console.log('REST Performance Test');
    console.log(result);
    console.log();
  });
});

observer.observe({ entryTypes: ['measure'], buffer: true });

const address = process.env.REST_SERVER_ADDRESS || 'localhost';
const port = process.env.REST_SERVER_PORT || 5001;

const performanceRest = async (endpoint, description) => {
  try {
    performance.mark('rest-start');
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      await axios.get(`http://${address}:${port}${endpoint}`);
    }
  } catch (error) {
    throw new Error(error);
  }
  performance.mark('rest-end');

  performance.measure(`REST http://${address}:${port}${endpoint}`, {
    start: 'rest-start',
    end: 'rest-end',
    detail: description,
  });
};

const performanceRestMessagesFromUsers = async (description) => {
  try {
    performance.mark('rest-start');
    const users = await axios.get(`http://${address}:${port}/users`);
    for (const key in users.data) {
      const userId = users.data[key].id;
      await axios.get(`http://${address}:${port}/messages/${userId}`);
    }
    REQUEST_COUNT = 1001;
  } catch (error) {
    throw new Error(error);
  }
  performance.mark('rest-end');

  performance.measure(`REST http://${address}:${port}/messages/:userid`, {
    start: 'rest-start',
    end: 'rest-end',
    detail: description,
  });
};

const performanceRestCreateUser = async (endpoint, description) => {
  REQUEST_COUNT = process.env.REQUEST_COUNT || 100;

  try {
    performance.mark('rest-start');
    for (let i = 1; i <= REQUEST_COUNT; i++) {
      await axios.post(`http://${address}:${port}${endpoint}`, {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
      });
    }
  } catch (error) {
    throw new Error(error);
  }
  performance.mark('rest-end');

  performance.measure(`REST http://${address}:${port}${endpoint}`, {
    start: 'rest-start',
    end: 'rest-end',
    detail: description,
  });
};

(async () => {
  await performanceRest('/users', 'Get all Users');
  await performanceRest('/user/1', 'Get User');
  await performanceRest('/messages', 'Get all Messages');
  await performanceRest('/message/1', 'Get Messages');
  await performanceRestMessagesFromUsers('Get Messages from all Users');
  //await performanceRestCreateUser('/user', 'Create a User');
})();
