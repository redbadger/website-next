import 'babel/polyfill';
import Layout from '../layouts/general';
import DateStamp from '../dateStamp';
import styles from './style.css';
import {Link} from 'react-router';

class Post extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <Layout>
        <article className={styles.post}>
          <DateStamp post={post} />
          <hr className={styles.divider} />
          <div className={styles.authorTitle} >
            <h1 className={styles.title}>{post.title}</h1>
            <p>
              {'by '}
              <Link className={styles.author} to={'/#'}>
               {`${post.author.firstName} ${post.author.lastName}`}
              </Link>
            </p>
          </div>
          <div dangerouslySetInnerHTML={ { __html: post.body } } />
        </article>
      </Layout>
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
        ${DateStamp.getFragment('post')}
      }
    `
  },
});
