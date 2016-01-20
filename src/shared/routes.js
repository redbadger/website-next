import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';
import NotFound from './containers/errors/not-found';

const routes = (
  <Route component={Root}>
    <Route component={JoinUs} path="/" />
    <Route component={Job} path="/:id" />
    <Route component={NotFound} path="*" />
  </Route>
);

export default routes;