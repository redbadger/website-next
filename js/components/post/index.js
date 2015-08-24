import 'babel/polyfill';
import Header from '../header';
import DateStamp from '../dateStamp';
import styles from './style.css';

class Post extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <div>
        <Header />
        <article className={styles.post}>
          <DateStamp className={post.publishedAt} />
          <h1>{post.title}</h1>
          <h3>By: {`${post.author.firstName} ${post.author.lastName}`}</h3>
          <div dangerouslySetInnerHTML={ { __html: post.body } } />
        </article>
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
        ${DateStamp.getFragment('post')}
      }
    `
  },
});
