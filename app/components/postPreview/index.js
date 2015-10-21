import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import styles from './style.css';
import DateStamp from '../dateStamp';

class PostPreview extends React.Component {
  render() {
    let { post } = this.props;
    return (
      <div className={styles.postPreview}>
        <DateStamp post={post} />
        <h3 className={styles.titleHeading}>
          <Link className={styles.titleAnchor} to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <div className={styles.author}>
          {'by '}
          <Link className={styles.authorLink} to={'/#'}>
           {`${post.author.firstName} ${post.author.lastName}`}
          </Link>
        </div>
        <article className={styles.postBody} >
          <p dangerouslySetInnerHTML={{ __html: post.preview }}/>
        </article>
        <Link className={styles.titleAnchor} to={`/blog/${post.id}`}>
          Read more...
        </Link>
      </div>
    );
  }
}

export default Relay.createContainer(PostPreview, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        slug
        title
        author {
          firstName
          lastName
        }
        preview
        ${DateStamp.getFragment('post')}
      }
    `
  }
});
