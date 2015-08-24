import 'babel/polyfill';
import PostPreview from '../postPreview';
import Header from '../header';
import styles from './style.css';

class PostIndex extends React.Component {
  state = { loading: false };

  componentDidMount() {
    window.onscroll = () => {
      if (!this.state.loading
        && (window.innerHeight + window.scrollY)
          >= document.body.offsetHeight) {

        this.setState({loading: true}, () => {
          this.props.relay.setVariables({
            count: this.props.relay.variables.count + 5
          }, (readyState) => { // this gets called twice https://goo.gl/ZsQ3Dy
            if (readyState.done) {
              this.setState({loading: false});
            }
          });
        });

      }
    }.bind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.postList}>
          {this.props.query.posts.edges.map(edge =>
            <PostPreview post={edge.node} />
          )}
          {this.state.loading && <h1 className={styles.loading}>Loading...</h1>}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(PostIndex, {
  initialVariables: {count: 15},
  fragments: {
    query: () => Relay.QL`
      fragment on Session {
        posts(first: $count) {
          edges {
            node {
              id
              ${PostPreview.getFragment('post')}
            }
          }
        }
      }
    `,
  },
});
