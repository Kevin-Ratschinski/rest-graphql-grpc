'use strict';

require('dotenv').config();
const axios = require('axios');

const REQUEST_COUNT = 100;
const address = process.env.REST_SERVER_ADDRESS || 'localhost';
const port = process.env.REST_SERVER_PORT || 5001;

const REST_SERVER = `http://${address}:${port}`;

const benchmark = async (endpoint) => {
  const startTime = process.hrtime();
  for (let i = 1; i <= REQUEST_COUNT; i++) {
    await axios.get(`${REST_SERVER}${endpoint}`);
  }
  const endTime = process.hrtime(startTime);
  console.log(
    `Done ${REQUEST_COUNT.toString()} ${endpoint} in ${endTime[0]} s ${(
      endTime[1] / 1e6
    ).toFixed(4)} ms`
  );
};

(async () => {
  await benchmark('/users');
  await benchmark('/user/1');
  await benchmark('/messages');
})();
