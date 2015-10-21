import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route } from 'react-router';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import PostIndex from './components/postIndex';
import Post from './components/post';

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

ReactDOM.render(
  <Router history={createBrowserHistory()} createElement={ReactRouterRelay.createElement}>
    <Route path="/">
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

if (typeof window !== 'undefined' && typeof console !== 'undefined') {
  console.log('Wanna work for Red Badger? See if you can get past the Badger Bouncer on our GraphQL route query type...');
  window.hint = '/graphiql';
}
