/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Post,
  getUser,
  getViewer,
  getPost,
  getPosts,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Post') {
      return getPost(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Post)  {
      return postType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    firstName: { type: new GraphQLNonNull(GraphQLString)},
    lastName: { type: new GraphQLNonNull(GraphQLString)},
    email: { type: new GraphQLNonNull(GraphQLString)},
    posts: {
      type: postConnection,
      description: 'A person\'s collection of posts',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getPosts(), args),
    },
  }),
  interfaces: [nodeInterface],
});

var postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post in blog',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: GraphQLString,
      description: 'The name of the post',
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Content of the post'
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'List of tags'
    },
    author: {
      type: userType,
      description: 'Author of the post'
    },
    publishedAt: {
      type: GraphQLString,
      description: 'Date and time of the publication'
    }
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
var {connectionType: postConnection} =
  connectionDefinitions({name: 'Post', nodeType: postType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
