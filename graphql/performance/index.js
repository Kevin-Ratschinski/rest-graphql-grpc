'use strict';

require('dotenv').config();
const graphqlClient = require('../client/graphqlClient');
const { performance, PerformanceObserver } = require('perf_hooks');
const query = require('./queries');

let REQUEST_COUNT = process.env.REQUEST_COUNT || 100;

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const result = {
      Measure: `${entry.detail} ${entry.name}`,
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

const address = process.env.GRAPHQL_SERVER_ADDRESS || 'localhost';
const port = process.env.GRAPHQL_SERVER_PORT || 5002;

const performanceGraphQL = async (query, variables, description) => {
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
};

const performanceGraphQLMessagesFromUsers = async (description) => {
  try {
    performance.mark('graphql-start');
    await graphqlClient.request(query.getMessagesFromUsers, {});
    REQUEST_COUNT = 1;
  } catch (error) {
    console.log(error);
  }
  performance.mark('graphql-end');

  performance.measure(`http://${address}:${port}`, {
    start: 'graphql-start',
    end: 'graphql-end',
    detail: description,
  });
};

(async () => {
  await performanceGraphQL(query.getUser, { id: 1 }, 'Get User');
  await performanceGraphQL(query.getUsers, {}, 'Get all Users');
  await performanceGraphQL(query.getMessage, { id: 1 }, 'Get Message');
  await performanceGraphQL(query.getMessages, {}, 'Get all Messages');
  await performanceGraphQLMessagesFromUsers('Get Messages from all Users');
  /* await performanceGraphQL(
    query.createUser,
    { first_name: 'test', last_name: 'test', email: 'test@test.com' },
    'Create a User'
  ); */
})();
