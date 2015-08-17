import Post from './Post';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Post list</h1>
        <ul>
          {this.posts.edges.map(edge =>
            <Post key={edge.node.id} post={edge.node} />
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    posts: () => Relay.QL`
      fragment on PostConnection {
        edges {
          node {
            id
            ${Post.getFragment('post')}
          }
        }
      }
    `,
  },
});
