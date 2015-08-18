import Post from './Post';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Post list</h1>
        <ul>
          {this.props.query.posts.edges.map(edge =>
            <Post key={edge.node.id} post={edge.node} />
          )}
        </ul>
        <button onClick={
            () => { this.props.relay.setVariables({
              count: this.props.relay.variables.count + 2
            });
          }
        }>
          Show more
        </button>
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
              ${Post.getFragment('post')}
            }
          }
        }
      }
    `,
  },
});
