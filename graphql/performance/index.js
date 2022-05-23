'use strict';

require('dotenv').config();
const graphqlClient = require('../client/graphqlClient');
const { performance, PerformanceObserver } = require('perf_hooks');
const query = require('./queries');

const REQUEST_COUNT = process.env.REQUEST_COUNT || 1000;

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const result = {
      Measure: `${entry.detail} from ${entry.name}`,
      Requests: +REQUEST_COUNT,
      DurationMs: +entry.duration.toFixed(4),
      DurationSec: +(entry.duration / 1000).toFixed(4),
    };

    console.log('GraphQL Performance Test');
    console.log(result);
    console.log();
  });
});

observer.observe({ entryTypes: ['measure'], buffer: true });

const address = process.env.GRAPHQL_SERVER_ADDRESS;
const port = process.env.GRAPHQL_SERVER_PORT;

const performanceGraphQL = async (query, variables, description) => {
  {
    try {
      performance.mark('graphql-start');
      for (let i = 1; i <= REQUEST_COUNT; i++) {
        await graphqlClient.request(query, variables);
      }
    } catch (error) {
      console.log(error);
    }
    performance.mark('graphql-end');

    performance.measure(`http://${address}:${port}`, {
      start: 'graphql-start',
      end: 'graphql-end',
      detail: description,
    });
  }
};

(async () => {
  await performanceGraphQL(query.getUser, { id: 1 }, 'Get User');
  await performanceGraphQL(query.getUsers, {}, 'Get all Users');
  await performanceGraphQL(query.getMessage, { id: 1 }, 'Get Message');
  await performanceGraphQL(query.getMessages, {}, 'Get all Messages');
  await performanceGraphQL(
    query.getMessagesFromUsers,
    {},
    'Get Messages from all Users'
  );
})();
