require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.GRAPHQL_SERVER_PORT || 5002;

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});
