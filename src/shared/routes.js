import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import Events from './containers/events';
import AddEvent from './containers/add-event';
import Event from './containers/event';
import { Route } from 'react-router';
import HttpError from './util/http-error';
import request from 'superagent';
import './containers/error';

function authenticate (nextState, replaceState, callback) {
  if (typeof window !== 'undefined') {
    request
      .get('/api/check-login')
      .end((err) => {
        if (err) {
          window.location.href = '/login';
        } else {
          callback();
        }
      });
  } else {
    callback();
  }
}

const routeFn = (store, args, ...children) => {
  if (args.component && args.component.fetchData) {
    args = {
      ...args,
      onEnter: (nextState, replaceState, done) => {
        if (args.needsAuth) {
          return authenticate();
        }

        args.component
          .fetchData(store.dispatch, store.getState, nextState)
          .then((response) => {
            if (response && ((response instanceof HttpError) || response.error)) {
              done(response.error || response);
            } else {
              done();
            }
          });
      }
    };
  }

  return (
    <Route key={args.path} {...args}>{children}</Route>
  );
};

export default function routes (store) {
  const route = routeFn.bind(null, store);
  return (
      route({ component: Root, path: '/' },
      route({ component: JoinUs, path: '/about-us/join-us' }),
      route({ component: Job, path: '/about-us/join-us/:id' }),
      route({ component: Events, path: '/about-us/events' }),
      route({ component: AddEvent, path: '/about-us/events/add', onEnter: authenticate }),
      route({ component: Event, path: '/about-us/events/:year/:month/:day/:slug' }),
    )
  );
}
