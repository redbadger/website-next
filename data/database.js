import requireDir from 'require-dir';
import users from '../migration/posts/out/authors';

// Model types
class Post extends Object {}
class User extends Object {}

var posts = [];
const postData = requireDir('../migration/posts/out/posts');
Object.keys(postData).forEach(k => {
  const d = postData[k];
  const post = new Post();
  post.id = d.slug;
  post.title = d.title;
  post.body = d.content;
  post.authorId = d.author;
  posts.push(post);
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getPost: (id) => posts.find(w => w.id === id),
  getPosts: () => posts,
  getUser: id => users.find(u => u.id === id),
  getPostsByUser: () => posts,
  User,
  Post
};
