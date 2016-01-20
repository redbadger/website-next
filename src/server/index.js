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

app.get('*',
  (req, res) => {
    workable.getJobs().then((jobs) => {
      const initialState = { jobs };
      const store = createStore(reducers, initialState);

      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        const htmlString = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        res.send(html(htmlString, store.getState(), path));
      });
    });
  }
);

app.use('/api', api);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
