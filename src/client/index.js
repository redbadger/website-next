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

match({ routes: getRoutes(store), location: window.location, history: browserHistory }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} history={browserHistory} />
    </Provider>, mountNode);
});
