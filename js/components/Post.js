import 'babel/polyfill';
import styles from 'style.css';

class Post extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <div>
        <h1 className={styles.specialHeader}>{post.title}</h1>
        <p>Published at: {post.publishedAt}</p>
        <h3>By: {`${post.author.firstName} ${post.author.lastName}`}</h3>
        <div dangerouslySetInnerHTML={ { __html: post.body } } />
      </div>
    );
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        title
        author {
          firstName
          lastName
        }
        body
        publishedAt
      }
    `
  },
});
