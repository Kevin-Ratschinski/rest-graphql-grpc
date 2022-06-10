'use strict';

require('dotenv').config();
const http2 = require('http2');
const { performance, PerformanceObserver } = require('perf_hooks');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

let REQUEST_COUNT = process.env.REQUEST_COUNT || 100;

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const result = {
      Measure: `${entry.detail} ${entry.name}`,
      Requests: +REQUEST_COUNT,
      DurationMs: +entry.duration.toFixed(4),
      DurationSec: +(entry.duration / 1000).toFixed(4),
    };

    console.log('REST Performance HTTP/2 Test');
    console.log(result);
    console.log();
  });
});

observer.observe({ entryTypes: ['measure'], buffer: true });

const address = process.env.REST_SERVER2_ADDRESS || 'localhost';
const port = process.env.REST_SERVER2_PORT || 5004;

const performanceRest = async (endpoint, description) => {
  return new Promise((resolve, reject) => {
    try {
      performance.mark('rest-start');
      let request = 0;
      const client = http2.connect(`https://${address}:${port}`);
      for (let i = 1; i <= REQUEST_COUNT; i++) {
        const req = client.request({
          ':path': endpoint,
        });

        let data = '';

        req.on('data', (chunk) => {
          data += chunk;
        });

        req.on('end', () => {
          request++;
          client.close();

          if (request == REQUEST_COUNT) {
            performance.mark('rest-end');

            performance.measure(`REST https://${address}:${port}${endpoint}`, {
              start: 'rest-start',
              end: 'rest-end',
              detail: description,
            });
            resolve();
          }
        });
        req.end();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const performanceRestMessagesFromUsers = async (description) => {
  try {
    performance.mark('rest-start');
    let request = 0;
    const client = http2.connect(`https://${address}:${port}`);

    const users = await getUsers();

    users.forEach((user) => {
      const userId = user.id;

      const req = client.request({
        ':path': `/messages/${userId}`,
      });

      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        request++;
        client.close();

        if (request == 1000) {
          REQUEST_COUNT = 1001;

          performance.mark('rest-end');

          performance.measure(
            `REST https://${address}:${port}/messages/:userId`,
            {
              start: 'rest-start',
              end: 'rest-end',
              detail: description,
            }
          );
        }
      });
      req.end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

function getUsers() {
  return new Promise((resolve, reject) => {
    const client = http2.connect(`https://${address}:${port}`);
    let users;
    let data = '';

    const req = client.request({
      ':path': '/users',
    });

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      users = JSON.parse(data);
      client.close();
      resolve(users);
    });
    req.on('error', (err) => {
      client.close();
      reject(err);
    });

    req.end();
  });
}

const performanceRestCreateUser = async (endpoint, description) => {
  return new Promise((resolve, reject) => {
    try {
      performance.mark('rest-start');
      let request = 0;
      const client = http2.connect(`https://${address}:${port}`);
      for (let i = 1; i <= REQUEST_COUNT; i++) {
        let res = '';
        let postbody = JSON.stringify({
          firstName: 'test',
          lastName: 'test',
          email: 'test@test.com',
        });

        const req = client.request({
          ':method': 'POST',
          ':path': endpoint,
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(postbody),
        });

        req.on('data', (chunk) => {
          res = res + chunk;
        });

        req.on('end', () => {
          console.log(res);
          request++;
          client.close();

          if (request == REQUEST_COUNT) {
            performance.mark('rest-end');

            performance.measure(`REST https://${address}:${port}${endpoint}`, {
              start: 'rest-start',
              end: 'rest-end',
              detail: description,
            });
            resolve();
          }
        });
        req.end(postbody);
      }
    } catch (error) {
      reject(error);
    }
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
