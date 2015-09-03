// Mutation for adding kudos to articles

export default class AddKudosToArticleMutation extends Relay.Mutation {
  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id,
        kudosCount
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{addKudosToArticle}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddKudosToArticlePayload {
        post {
          kudosCount
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

  getCollisionKey() {
    return `check_${this.props.post.id}`;
  }

  getVariables() {
    return {
      id: this.props.post.id,
    };
  }

  getOptimisticResponse() {
    return {
      post: {
        id: this.props.post.id,
        kudosCount: this.props.post.kudosCount + 1,
      }
    };
  }
}
