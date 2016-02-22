import qs from 'query-string';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import createStore from '../../shared/create-store';

import { match, createMemoryHistory, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import HttpError from '../../shared/util/http-error';
import ErrorPage from '../../shared/containers/error';
import DefaultTemplate from '../templates/default';

import getRoutes from '../../shared/routes';

const renderMarkup = (store, routerProps) => {
  const application = renderToString(
    <Provider store={store}>
      <RouterContext {...routerProps}/>
    </Provider>
  );

  return renderToStaticMarkup(
    <DefaultTemplate initialState={store.getState()}>
      {application}
    </DefaultTemplate>
  );
};

const renderErrorPage = (error) => {
  const application = renderToString(
    <ErrorPage status={error.status} />
  );

  return renderToStaticMarkup(
    <DefaultTemplate js={false}>
      {application}
    </DefaultTemplate>
  );
};

const handleError = (error, res) => {
  if (error instanceof HttpError) {
    res.status(error.status).send(renderErrorPage(error));
  } else {
    console.error('Unhandled exception: ', error);
    handleError(new HttpError(500), res);
  }
};

export const requestHandler = (req, res, store, render) => {
  return (error, redirectLocation, routerProps) => {
    const state = store.getState();

    if (state.errors && state.errors.length > 1) {
      return handleError(state.errors[state.errors.length], res);
    }

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
