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

const mapRouteToPageTitle = (path) => {
  const defaultTitle = 'Red Badger';

  if ((/events/gi).test(path)) {
    return `Events | ${defaultTitle}`;
  }

  if ((/join-us/gi).test(path)) {
    return `Join Us | ${defaultTitle}`;
  }

  return defaultTitle;
};

const renderMarkup = (store, routerProps) => {
  let application;

  try {
    application = renderToString(
      <Provider store={store}>
        <RouterContext {...routerProps}/>
      </Provider>
    );
  } catch (error) {
    console.log(error);
  }

  return renderToStaticMarkup(
    <DefaultTemplate
        initialState={store.getState()}
        title={mapRouteToPageTitle(routerProps.location.pathname)}
    >
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
    console.error('Server error:', error);
    res.status(500).send(renderErrorPage(new HttpError(500)));
  }
};

export const requestHandler = (req, res, store, render) => (
  (error, redirectLocation, routerProps) => {
    if (error) {
      handleError(error, res);
    } else if (redirectLocation) {
      res.redirect(302,
        `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (!routerProps) {
      handleError(new HttpError(404), res);
    } else {
      res.status(200).send(render(store, routerProps));
    }
  }
);

export default((req, res) => {
  const history = createMemoryHistory();
  const store = createStore(history);

  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? `?${query}` : '');

  match({
    routes: getRoutes(store),
    location: url,
  }, requestHandler(req, res, store, renderMarkup));
});
