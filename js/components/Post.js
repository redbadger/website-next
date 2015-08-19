import 'babel/polyfill';

class Post extends React.Component {
  render() {
    let {post} = this.props;
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <h3>By: {`${this.props.post.author.firstName} ${this.props.post.author.lastName}`}</h3>
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
        author {
          firstName
          lastName
        }
        body
        publishedAt
      }
    `
  },
});
