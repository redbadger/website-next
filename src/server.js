import express from 'express';
import html from './html';
import React from 'react';
import reducers from './reducers';
import Root from './containers/root';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

const app = express();
const port = process.env.PORT || 8000;

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

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
