import Post from './Post';

class App extends React.Component {
  render() {
    debugger
    return (
      <div>
        <h1>Post list</h1>
        <ul>
          {this.props.query.posts.edges.map(edge =>
            <Post key={edge.node.id} post={edge.node} />
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    query: () => Relay.QL`
      fragment on Test {
        posts(first: 4) {
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
