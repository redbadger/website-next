/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class Post extends Object {}
class User extends Object {}

// Mock data
var user = new User();
user.id = '1';
user.firstName = 'Erlich';
user.lastName = 'Bachman';
user.email = 'erlich@bachman.com';

var posts = ['Ok blog', 'Shit blog', 'Albert viral blog'].map((title, i) => {
  let post = new Post();
  post.id = `${i}`;
  post.title = title;
  post.body = 'bla bla bla';
  post.author = user;
  return post;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getPost: (id) => posts.find(w => w.id === id),
  getPosts: () => posts,
  getUser: () => user,
  getPostsByUser: () => posts,
  User,
  Post
};
