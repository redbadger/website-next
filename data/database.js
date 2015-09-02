import requireDir from 'require-dir';
import users from '../migration/posts/out/authors';

// Model types
class Post extends Object {}
class User extends Object {}

var posts = [];
const postData = requireDir('../migration/posts/out/posts');
Object.keys(postData).forEach(k => {
  const d = postData[k];
  let post = new Post();
  post.id = d.url.replace('http://red-badger.com/blog/', '').slice(0, -1);
  post.title = d.title;
  post.preview = d.preview;
  post.body = d.content;
  post.authorId = d.author;
  post.publishedAt = d.publishedAt;
  post.kudosCount = 0; // TODO: need persistence
  posts.push(post);
});

posts = posts.sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

module.exports = {
  // Export methods that your schema can use to interact with your database
  getPost: (id) => posts.find(post => post.id === id),
  getPosts: () => posts,
  getUser: id => users.map((userData) => {
    let user = new User();
    user.id = userData.id;
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    return user;
  }).find(u => u.id === id),
  getPostsByUser: (id) => posts.filter(w => w.authorId === id),
  User,
  Post,
  updatePostKudosCount: (id) => {
    this.getPost(id).kudosCount++;
  }
};
