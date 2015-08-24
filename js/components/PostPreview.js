import 'babel/polyfill';
import {Link} from 'react-router';

class PostPreview extends React.Component {
  _handleLike = () => {
    // To perform a mutation, pass an instance of one to `Relay.Store.update`
    Relay.Store.update(new LikePostMutation({story: this.props.post}));
  }

  render() {
    let {post} = this.props;
    return (
      <div>
        <Link to={`/blog/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <h3>By: {`${post.author.firstName} ${post.author.lastName}`}</h3>
        <p>Published at: {post.publishedAt}</p>
        {post.viewerDoesLike
          ? 'You like this'
          : <button onClick={this._handleLike}>Like this</button>
        }
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
        viewerDoesLike
        ${LikePostMutation.getFragment('post')},
        author {
          firstName
          lastName
        }
        publishedAt
      }
    `
  },
});
