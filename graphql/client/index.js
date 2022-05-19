'use strict';

const graphqlClient = require('./graphqlClient');
const queries = require('../performance/queries');

(async () => {
  let data = await graphqlClient.request(queries.getUser, { id: 172 });
  console.log(data);

  data = await graphqlClient.request(queries.getMessage, { id: 172 });
  console.log(data);

  data = await graphqlClient.request(queries.getMessagesFromUser, { id: 172 });
  console.log(data);

  data = await graphqlClient.request(queries.createUser, {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
  });
  console.log(data);

  data = await graphqlClient.request(queries.updateUser, {
    id: 29,
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
  });
  console.log(data);

  data = await graphqlClient.request(queries.deleteUser, { id: 13 });
  console.log(data);
})();
