'use strict';
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = graphql;

let usersData = require('../../../data/users_data.json');
let messagesData = require('../../../data/messages_data.json');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return messagesData.filter((message) => message.userId === parent.id);
      },
    },
  }),
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return usersData.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return usersData.find((user) => user.id == args.id);
      },
    },
    message: {
      type: MessageType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return messagesData.find((message) => message.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
