class Post extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
      </div>
    );
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        title
        body
      }
    `
  },
});
