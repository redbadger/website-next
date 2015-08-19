import {Router, Route} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import relayNestedRoutes from 'relay-nested-routes';

import App from './components/App';

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

React.render(
  <Router history={new BrowserHistory()}>
    <Route component={NestedRootContainer}>
      <Route
        name="blog-index" // added a name to the route
        path="/"
        component={App}
        queries={IndexQueries} // and the query
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
