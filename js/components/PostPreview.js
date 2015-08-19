import 'babel/polyfill';
import {Link} from 'react-router';

class PostPreview extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <div>
        <Link to={`/blog/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <h3>By: {`${post.author.firstName} ${post.author.lastName}`}</h3>
        <p>Published at: {post.publishedAt}</p>
      </div>
    );
  }
}

export default Relay.createContainer(PostPreview, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        slug
        title
        author {
          firstName
          lastName
        }
        publishedAt
      }
    `
  },
});
