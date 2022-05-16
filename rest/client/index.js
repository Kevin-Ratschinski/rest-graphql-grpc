const axios = require('axios');
const http = require('http');

http.globalAgent.keepAlive = true;

const REQUEST_COUNT = process.env.REQUEST_COUNT || 10;
const REST_SERVER = 'http://localhost:5001';

const benchmark = async (endpoint) => {
  const startTime = process.hrtime();
  for (let i = 1; i <= REQUEST_COUNT; i++) {
    await axios.get(`${REST_SERVER}${endpoint}`);
  }
  const endTime = process.hrtime(startTime);
  console.log(
    `Done ${REQUEST_COUNT.toLocaleString()} ${endpoint} in ${endTime[0]} s ${(
      endTime[1] / 1e6
    ).toFixed(4)} ms`
  );
};

(async () => {
  await benchmark('/users');
  await benchmark('/user/1');
  await benchmark('/messages');
})();
