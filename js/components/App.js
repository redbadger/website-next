import Post from './Post';

class App extends React.Component {
  render() {
    console.log(JSON.stringify(this.props.viewer.posts));
    return (
      <div>
        <h1>Posts list</h1>
        <ul>
          {this.props.viewer.posts.edges.map(edge =>
            <li>{edge.node.title} (ID: {edge.node.id})
 {edge.node.publishedAt}</li>
          )}
        </ul>
        <h2>More posts</h2>
        <ul>
          {this.props.viewer.posts.edges.map(
            edge =>
              <li><Post key={edge.node.id} post={edge.node} /></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        posts(first: 10) {
          edges {
            node {
              id,
              title,
              publishedAt,
              body
            },
          },
        },
      }
    `,
  },
});
