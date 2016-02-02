import React from 'react';
import Root from './containers/root';
import JoinUs from './containers/join-us';
import Job from './containers/job';
import { Route } from 'react-router';

<<<<<<< 6c4f0ad51fed80e901329f66816906f63d5de6ea
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
=======
const routes = (
  <Route component={Root}>
    <Route component={JoinUs} path="/about-us/join-us" />
    <Route component={Job} path="/about-us/join-us/:id" />
  </Route>
);
>>>>>>> Move error background to Root container

  return (
    <Route key={args.path} {...args}>{children}</Route>
  );
};

export default function routes (store) {
  const route = routeFn.bind(null, store);
  return (
      route({ component: Root, path: '/' },
      route({ component: JoinUs, path: '/about-us/join-us' }),
      route({ component: Job, path: '/about-us/join-us/:id' })
    )
  );
}
