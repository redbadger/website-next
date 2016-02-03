import React from 'react';
import { renderToString } from 'react-dom/server';
import qs from 'query-string';
import serialize from 'serialize-javascript';
import html from '../html';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, match } from 'react-router';

import reducers from '../../shared/reducers';
import getRoutes from '../../shared/routes';

const renderMarkup = (store) => {
  const body = renderToString(
    <Provider key="provider" store={store}>
      <Router routes={getRoutes(store)}/>
    </Provider>
  );

  return html(body, serialize(store.getState()), true);
};

export default((req, res) => {
  // const history = createMemoryHistory();
  const store = createStore(reducers);

  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? '?' + query : '');

  store.dispatch(match({ routes: getRoutes(store), location: url }, (error, redirectLocation, routerState) => {
    if (error) {
      console.error('Routing error:', error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send(renderMarkup(store));
    }
  }));
});
