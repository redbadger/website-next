import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';
import ErrorPage from './containers/error';

const routes = (
  <Route component={Root}>
    <Route component={JoinUs} path="/about-us/join-us" />
    <Route component={Job} path="/about-us/join-us/:id" />
    <Route component={ErrorPage} path="*" />
  </Route>
);

export default routes;
