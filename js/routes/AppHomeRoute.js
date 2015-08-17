export default class extends Relay.Route {
  static path = '/';
  static queries = {
    posts: Component => {
      Relay.QL`
        query {
          posts(first: 10) {
            ${Component.getFragment('posts')}
          }
        }
      `
    }
  };
  static routeName = 'AppHomeRoute';
}
