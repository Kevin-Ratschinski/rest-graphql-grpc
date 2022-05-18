'use strict';

const { gql } = require('apollo-server-express');

const userSchema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(first_name: String!, last_name: String!, email: String!): User!
    updateUser(
      id: ID!
      first_name: String
      last_name: String
      email: String
    ): User!
    deleteUser(id: ID!): Boolean!
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
