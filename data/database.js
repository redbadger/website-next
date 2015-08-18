/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User extends Object {}
class Post extends Object {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';
viewer.firstName = 'Erlich';
viewer.lastName = 'Bachman';
viewer.email = 'erlich.bachman@gmail.com';

var posts = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
  var post = new Post();
  post.title = name;
  post.id = `${i}`;
  post.body = 'bla bla bla';
  post.author = viewer;
  post.publishedAt = 'Mon Aug 17 17:17:12 BST 2015';
  return post;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getPost: (id) => posts.find(w => w.id === id),
  getPosts: () => posts,
  User,
  Post,
};
