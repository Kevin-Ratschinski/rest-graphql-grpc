'use strict';
const { performance, PerformanceObserver } = require('perf_hooks');
const axios = require('axios');

const REQUEST_COUNT = process.env.REQUEST_COUNT || 1000;

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
    `http://localhost:5001${endpoint}`,
    'rest-start',
    'rest-end'
  );
};

(async () => {
  await performanceRest('/users');
  await performanceRest('/user/1');
  await performanceRest('/messages');
})();
