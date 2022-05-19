'use strict';

const graphqlClient = require('./graphqlClient');
const { gql } = require('graphql-request');

(async () => {
  const query = gql`
    query getUser($id: ID!) {
      user(id: $id) {
        id
        first_name
        last_name
        messages {
          text
        }
      }
    }
  `;

  let variablesQuery = {
    id: 172,
  };

  const mutation = gql`
    mutation deleteUser($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  let variablesMutation = {
    id: 1,
  };

  let data = await graphqlClient.request(query, variablesQuery);
  console.log(data);

  data = await graphqlClient.request(mutation, variablesMutation);
  console.log(data);
})();
