const { gql } = require('apollo-server-express');

const messageSchema = gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!, userId: ID!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    userId: ID!
    user: User!
  }
`;

module.exports = messageSchema;
