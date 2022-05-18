'use strict';

require('dotenv').config();
const axios = require('axios');

const address = process.env.GRAPHQL_SERVER_ADDRESS || 'localhost';
const port = process.env.GRAPHQL_SERVER_PORT || 5002;

const GRAPHQL_SERVER = `http://${address}:${port}/graphql`;

axios({
  url: GRAPHQL_SERVER,
  method: 'post',
  data: {
    query: `
    {
      user(id: 172) {
        id
        first_name
        messages {
          id
          userId
          text
        }
      }
    }
      `,
  },
}).then((result) => {
  console.log(result.data);
});
