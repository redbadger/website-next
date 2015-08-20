import 'babel/polyfill';

import PostPreview from './PostPreview';

class App extends React.Component {
  state = { loading: false };

  componentDidMount() {
    window.onscroll = () => {
      if (!this.state.loading
        && (window.innerHeight + window.scrollY)
          >= document.body.offsetHeight) {

        this.setState({loading: true}, () => {
          this.props.relay.setVariables({
            count: this.props.relay.variables.count + 2
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
        <h1>Post list</h1>
        {this.props.query.posts.edges.map(edge =>
          <PostPreview post={edge.node} />
        )}
        {this.state.loading && <h1>Loading...</h1>}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {count: 5},
  fragments: {
    query: () => Relay.QL`
      fragment on Test {
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
