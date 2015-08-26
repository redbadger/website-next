import 'babel/polyfill';
import Layout from '../layouts/general';
import DateStamp from '../dateStamp';
import styles from './style.css';

class Post extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <Layout>
        <article className={styles.post}>
          <DateStamp post={post} />
          <h1>{post.title}</h1>
          <h3>By: {`${post.author.firstName} ${post.author.lastName}`}</h3>
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
