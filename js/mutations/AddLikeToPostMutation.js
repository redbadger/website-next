export default class LikePostMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {likePost}`;
  }

  getVariables() {
    return {storyID: this.props.post.id};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LikePostPayload {
        post {
          likeCount,
          viewerDoesLike,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        post: this.props.post.id,
      },
    }];
  }

  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id,
      }
    `,
  };
}
