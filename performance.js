'use strict';
const { performance, PerformanceObserver } = require("perf_hooks");
const axios = require('axios');

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

observer.observe({ entryTypes: ["measure"], buffer: true });

(async () => {
  try {
    performance.mark('swapi-start');
    await axios.get('https://swapi.dev/api/people/1/');
  } catch (err) {
    throw new Error(err);
  }
  performance.mark('swapi-end');

  performance.measure('https://swapi.dev/api/people/1/', 'swapi-start', 'swapi-end');
})();
