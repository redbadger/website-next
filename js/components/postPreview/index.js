import 'babel/polyfill';
import {Link} from 'react-router';
import styles from './style.css';

class PostPreview extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <div>
        <h3>
          <Link className={styles.titleLink} to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p>
          {'By: '} 
          <Link className={styles.authorLink} to={'/#'}>
           {`${post.author.firstName} ${post.author.lastName}`}
          </Link>
        </p>
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
