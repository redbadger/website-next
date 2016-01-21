import API from './api';
import express from 'express';
import fetch from 'node-fetch';
import fetchProxy from './fetch-proxy';
import html from './html';
import React from 'react';
import reducers from '../shared/reducers';
import WorkableAPI from './api/workable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../shared/routes';
import ErrorPage from '../shared/containers/errors/generic';
import Root from '../shared/containers/root';

const app = express();
const port = process.env.PORT || 8000;
const workable = new WorkableAPI(fetchProxy(fetch), process.env.WORKABLE_KEY);
const api = API(workable);

app.use(
  express.static('static')
);

app.use(
  express.static('build/client')
);

// Turn React Routers match into a promise api
function matchPromise (options) {
  return new Promise(function (resolve, reject) {
    match(options, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }
      return resolve({ redirectLocation, renderProps });
    });
  });
}

function renderComponent ([ jobs, match ]) {
  const initialState = { jobs };
  const store = createStore(reducers, initialState);
  const htmlString = renderToString(
    <Provider store={store}>
      <RouterContext {...match.renderProps} />
    </Provider>
  );
  return html(htmlString, store.getState(), true);
}

app.get('*',
  (req, res) => {
    Promise.all([
      workable.getJobs(),
      matchPromise({ routes, location: req.url })
    ])
    .then(renderComponent)
    .then(res.send.bind(res))
    .catch(() => {
      res
        .status(500)
        .send(html(renderToString(<Root><ErrorPage /></Root>), {}));
    });
  }
);

app.use('/api', api);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
