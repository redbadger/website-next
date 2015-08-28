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

// Amy Crimmens wants to advertise for jobs in the console!
console.log('%cWanna work for Red Badger? See if you can get past the Badger Bouncer on our GraphQL route query type...', 'font-size:30px;color:red;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
