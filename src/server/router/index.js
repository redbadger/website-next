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
    <DefaultTemplate
        initialState={store.getState()}
        title={mapRouteToPageTitle(routerProps.location.pathname)}
    >
      {application}
    </DefaultTemplate>
  );
};

function mapRouteToPageTitle (path) {
  const eventsRegex = new RegExp('events', 'gi');
  const joinRegex = new RegExp('join-us', 'gi');

  if (eventsRegex.test(path)) {
    return 'Events | Red Badger';
  }

  if (joinRegex.test(path)) {
    return 'Join Us | Red Badger';
  }

  return 'Red Badger';
}

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

export const requestHandler = (req, res, store, render) => {
  return (error, redirectLocation, routerProps) => {
    // Check if React router has needsAuth prop if so check they're logged in
    if (routerProps && routerProps.routes) {
      let needsAuth = routerProps.routes.reduce((prev, curr) => 'needsAuth' in curr || prev, false);
      if (needsAuth && !req.isAuthenticated()) {
        redirectLocation = { pathname: '/auth/login', search: '' };
      }
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
