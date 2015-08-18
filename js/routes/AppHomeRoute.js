export default class extends Relay.Route {
  static path = '/';
  static queries = {
    query: Component => Relay.QL`
      query {
        test {
          ${Component.getFragment('query')}
        }
      }
    `
  };
  static routeName = 'AppHomeRoute';
}
