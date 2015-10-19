/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean, // eslint-disable-line
  GraphQLFloat, // eslint-disable-line
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  User,
  Post,
  getPost,
  getPosts,
  getPostsByUser,
  getUser,
  updatePostKudosCount
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
    if (type === 'Post') {
      return getPost(id);
    } else if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Post) {
      return postType;
    } else if (obj instanceof User) {
      return userType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */
const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A blog user',
  fields: () => ({
    id: globalIdField('User'),
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: postConnection,
      description: 'The users posts',
      args: connectionArgs,
      resolve: ({id}, args) => connectionFromArray(
        getPostsByUser(id),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});


const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A shiny post',
  fields: () => ({
    id: globalIdField('Post'),
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    preview: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({id}) => id
    },
    author: {
      type: userType,
      resolve: ({authorId}) => getUser(authorId)
    },
    publishedAt: { type: GraphQLString },
    kudosCount: {type: new GraphQLNonNull(GraphQLInt)}
  }),
  interfaces: [nodeInterface]
});

const sessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'Temporary intermediate object while issue https://github.com/facebook/relay/issues/108 is fixed/figured out',
  fields: () => ({
    ip: {
      type: GraphQLString
    },
    posts: {
      type: postConnection,
      description: 'Our collection of posts',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getPosts(), args)
    }
  })
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
    session: {
      type: sessionType,
      resolve: (request) => request
    },
    getPostBySlug: {
      type: postType,
      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Slug of the blog including the prepended date. E.g 2015/08/10/london-react-meetup-august-2015/'
        }
      },
      resolve: (_, {slug}) => {
        return getPost(slug);
      }
    },

    // Easter egg feature for potential recruites
    badgerBouncer: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        timsChars: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Enter the characters that were Tim Berners-Lee\'s big mistake in the web address'
        }
      },
      resolve: (_, {timsChars}) => {
        if (timsChars === '//') {
          return 'Correct! The password is WOBBLYBADGER. Email jobs@red-badger.com.';
        }
        return 'Wrong. But you\'ve got this far don\'t give up';
      }
    }
  }),
});

var AddKudosToArticleMutation = mutationWithClientMutationId({
  name: 'AddKudosToArticle',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    post: {
      type: postType,
      resolve: ({localPostId}) => getPost(localPostId)
    }
  },
  mutateAndGetPayload: ({id}) => {
    var localPostId = fromGlobalId(id).id;
    // Update database
    updatePostKudosCount(localPostId);
    return {localPostId};
  }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addKudosToArticle: AddKudosToArticleMutation
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
