class Post extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <div dangerouslySetInnerHTML={ { __html: this.props.post.body } } />
        <p>Published at: {this.props.post.publishedAt}</p>
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
        publishedAt
      }
    `
  },
});
