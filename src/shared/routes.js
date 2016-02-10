import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';
import './containers/error';

export default function routes (store) {
  return (
    <Route component={Root} path="/">
      <Route component={JoinUs} onEnter={JoinUs.onEnter(store)} path="/about-us/join-us" />
      <Route component={Job} onEnter={Job.onEnter(store)} path="/about-us/join-us/:id" />
    </Route>
  );
}
