const { gql } = require('apollo-server-express');

const userSchema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    messages: [Message!]
  }
`;

module.exports = userSchema;
