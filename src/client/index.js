import getRoutes from '../shared/routes';
import reducers from '../shared/reducers';

import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';

const initialStateString = document.getElementById('initialState').textContent;
const initialState = JSON.parse(initialStateString);

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

const mountNode = document.getElementById('mount');

match({ routes: getRoutes(store), location: window.location, history: browserHistory }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} history={browserHistory} />
    </Provider>, mountNode);
});
