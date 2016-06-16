import getRoutes from '../shared/routes';
import createStore from '../shared/create-store';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';

const initialStateString = document.getElementById('initialState').textContent;
const initialState = JSON.parse(initialStateString);
const store = createStore(browserHistory, initialState);

const mountNode = document.getElementById('mount');

match({
  routes: getRoutes(store),
  location: window.location,
  history: browserHistory,
}, (error, redirectLocation, renderProps) => {
  const routerUpdate = () => {
    if (renderProps && !(store.getState().routing.location.hash)) {
      window.scrollTo(0, 0); // Scroll to top when a hash doesn't exist, and we're on a valid route.
    }
  };

  const Application = (
    <Provider store={store}>
      <Router {...renderProps} history={browserHistory} onUpdate={routerUpdate} />
    </Provider>
  );

  render(Application, mountNode);
});
