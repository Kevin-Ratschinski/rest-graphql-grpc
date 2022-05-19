'use strict';

const { gql } = require('graphql-request');

const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

const getUsers = gql`
  query getUsers {
    users {
      id
      first_name
      last_name
      email
    }
  }
`;

const getMessage = gql`
  query getMessage($id: ID!) {
    message(id: $id) {
      id
      text
      userId
    }
  }
`;

const getMessages = gql`
  query getMessages {
    messages {
      id
      text
      userId
    }
  }
`;

const getMessagesFromUser = gql`
  query getMessagesFromUser($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      email
      messages {
        id
        text
        userId
      }
    }
  }
`;

const getMessagesFromUsers = gql`
  query getMessagesFromUsers {
    users {
      id
      first_name
      last_name
      email
      messages {
        id
        text
        userId
      }
    }
  }
`;

const createUser = gql`
  mutation createUser(
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    createUser(first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

const updateUser = gql`
  mutation updateUser(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

module.exports = {
  getUser,
  getUsers,
  getMessage,
  getMessages,
  getMessagesFromUser,
  getMessagesFromUsers,
  createUser,
  updateUser,
  deleteUser,
};
