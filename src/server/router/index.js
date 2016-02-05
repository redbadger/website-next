import qs from 'query-string';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createStore from '../../shared/create-store';

import { match, createMemoryHistory, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import html from '../html';
import HttpError from '../../shared/util/http-error';
import ErrorPage from '../../shared/containers/error';

import getRoutes from '../../shared/routes';

const renderMarkup = (store, routerProps) => {
  const htmlString = renderToString(
    <Provider store={store}>
      <RouterContext {...routerProps}/>
    </Provider>
  );

  return html(htmlString, store.getState(), true);
};

const renderErrorPage = (error) => {
  const htmlString = renderToString(
      <ErrorPage status={error.status} />
  );

  return html(htmlString, {});
};

const handleError = (error, res) => {
  if (error instanceof HttpError) {
    res.status(error.status).send(renderErrorPage(error));
  } else {
    console.error('Server error:', error);
    res.status(500).send(renderErrorPage(new HttpError(500)));
  }
};

export const requestHandler = (req, res, store, render) => {
  return (error, redirectLocation, routerProps) => {
    if (error) {
      handleError(error, res);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerProps) {
      handleError(new HttpError(404), res);
    } else {
      res.status(200).send(render(store, routerProps));
    }
  };
};

export default((req, res) => {
  const history = createMemoryHistory();
  const store = createStore(history);

  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? '?' + query : '');

  match({ routes: getRoutes(store), location: url }, requestHandler(req, res, store, renderMarkup));
});
