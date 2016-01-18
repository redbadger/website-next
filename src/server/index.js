import API from './api';
import express from 'express';
import fetch from 'node-fetch';
import fetchProxy from './fetch-proxy';
import html from './html';
import React from 'react';
import reducers from '../shared/reducers';
import Root from '../shared/containers/root';
import WorkableAPI from './api/workable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

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

app.get('/',
  (req, res) => {
    const store = createStore(reducers);

    const htmlString = renderToString(
      <Provider store={store}>
        <Root />
      </Provider>
    );

    const initialState = store.getState();
    res.send(html(htmlString, initialState, path));
  }
);

app.use('/api', api);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
