import {Router, Route} from 'react-router';
import relayNestedRoutes from 'relay-nested-routes';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import PostIndex from './components/postIndex';
import Post from './components/post';

const NestedRootContainer = relayNestedRoutes(React, Relay);


let IndexQueries = {
  query: Component => Relay.QL`
    query {
      session {
        ${Component.getFragment('query')}
      }
    }
  `
};

// The root queries for the widget site
let PostQueries = {
  post: Component => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('post')},
      },
    }
  `
};

React.render(
  <Router history={new BrowserHistory()}>
    <Route component={NestedRootContainer}>
      <Route
        name="home" // added a name to the route
        path="/blog"
        component={PostIndex}
        queries={IndexQueries} // and the query
      />
      <Route
        name="post"
        path="/blog/:id"
        component={Post}
        queries={PostQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
