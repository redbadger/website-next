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

const app = express();
const port = process.env.PORT || 8000;
const workable = new WorkableAPI(fetchProxy(fetch), process.env.WORKABLE_KEY);
const api = API(workable);

let path = '';

// When using Hot Module Replacement we need to serve the client-side files
// from Webpack Dev Server so that the client can be notified of changes and
// receive them.
if (process.env.HMR === 'true') {
  path = 'http://localhost:8080';
}

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
  return html(htmlString, store.getState(), path);
}

app.get('*',
  (req, res) => {
    Promise.all([
      workable.getJobs(),
      matchPromise({ routes, location: req.url })
    ])
    .then(renderComponent)
    .then(res.send.bind(res));
  }
);

app.use('/api', api);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
