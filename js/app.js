import {Router, Route} from 'react-router';
import relayNestedRoutes from 'relay-nested-routes';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import App from './components/App';
import Post from './components/Post';

const NestedRootContainer = relayNestedRoutes(React, Relay);


let IndexQueries = {
  query: Component => Relay.QL`
    query {
      test {
        ${Component.getFragment('query')}
      }
    }
  `
};

// The root queries for the widget site
let PostQueries = {
  post: (Component) => {
    return Relay.QL`
      query {
        getPostBySlug(slug: $splat) {
          ${Component.getFragment('post')},
        },
      }
    `}
};

React.render(
  <Router history={new BrowserHistory()}>
    <Route component={NestedRootContainer}>
      <Route
        name="home" // added a name to the route
        path="/blog"
        component={App}
        queries={IndexQueries} // and the query
      />
      <Route
        name="post"
        path="/blog/*"
        component={Post}
        queries={PostQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
