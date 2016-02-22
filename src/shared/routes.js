import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';
import fetch from './util/fetch-proxy';
import './containers/error';

function onEnter (store, fn) {
  return (nextState, _, done) => {
    return store.dispatch(fn(fetch(), nextState)).then(() => done());
  };
}

export default function routes (store) {
  return (
    <Route component={Root}>
      <Route component={JoinUs} onEnter={onEnter(store, JoinUs.onEnter)} path="/about-us/join-us" />
      <Route component={Job} onEnter={onEnter(store, Job.onEnter)} path="/about-us/join-us/:id" />
    </Route>
  );
}
