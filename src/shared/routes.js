import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';
// import ErrorPage from './containers/error';

const routeFn = (store, args, ...children) => {
  if (args.component && args.component.fetchData) {
    args = {
      ...args,
      onEnter: (nextState, replaceState, done) => {
        args.component
          .fetchData(store.dispatch, store.getState)
          .then(() => done());
      }
    };
  }

  return (
    <Route key={args.path} {...args}>{children}</Route>
  );
};

const routes = (store) => {
  const route = routeFn.bind(null, store);
  return (
    route({ path: '/', component: Root },
      route({ component: JoinUs, path: '/about-us/join-us' }),
      route({ component: Job, path: '/about-us/join-us/:id' })
    )
  );
};

export default routes;
