import React from 'react';
import Relay from 'react-relay';
import Layout from '../layouts/general';
import DateStamp from '../dateStamp';
import styles from './style.css';
import { Link } from 'react-router';
import AddKudosToArticleMutation from '../../mutations/AddKudosToArticleMutation';

class Post extends React.Component {
  _handleKudos = () => {
    Relay.Store.update(new AddKudosToArticleMutation({
      post: this.props.post,
    }));
  }

  render() {
    let { post } = this.props;
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
          <div>
            <p>
              Kudos count: {post.kudosCount}
            </p>
            <p>
              <button onClick={this._handleKudos}>Kudos</button>
            </p>
          </div>
          <div className={styles.body} dangerouslySetInnerHTML={ { __html: post.body } } />
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
        kudosCount
        ${DateStamp.getFragment('post')}
        ${AddKudosToArticleMutation.getFragment('post')}
      }
    `,
  },
});
