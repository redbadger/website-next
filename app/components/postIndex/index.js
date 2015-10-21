import React from 'react';
import Relay from 'react-relay';
import PostPreview from '../postPreview';
import Layout from '../layouts/general';
import styles from './style.css';

class PostIndex extends React.Component {
  state = { loading: false };

  _loadMore() {
    this.setState({ loading: true }, () => {
      this.props.relay.setVariables({
        count: this.props.relay.variables.count + 5
      }, (readyState) => { // this gets called twice https://goo.gl/ZsQ3Dy
        if (readyState.done) {
          this.setState({ loading: false });
        }
      });
    });
  }

  render() {
    return (
      <Layout>
        <div className={styles.postList}>
          {this.props.query.posts.edges.map((edge, index) =>
            <div key={index}>
              {index == 0 ? null : <hr className={styles.divider} />}
              <PostPreview post={edge.node} />
            </div>
          )}
          <hr className={styles.divider} />
          <button
            className={styles.loadMoreButton}
            onClick={this._loadMore.bind(this)}
            disabled={this.state.loading} >
            {this.state.loading ?
              <div className={styles.spinner}>
                <div className={styles.bounce1}></div>
                <div className={styles.bounce2}></div>
              </div> : 'Load more posts'}
          </button>
        </div>
      </Layout>
    );
  }
}

export default Relay.createContainer(PostIndex, {
  initialVariables: { count: 5 },
  fragments: {
    query: () => Relay.QL`
      fragment on Session {
        posts(first: $count) {
          edges {
            node {
              ${PostPreview.getFragment('post')}
            }
          }
        }
      }
    `
  }
});
