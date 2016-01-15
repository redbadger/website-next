import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html from './html';
import Root from './components/root';
import WorkableAPI from './api/workable';

const app = express();
const root = (<Root />);
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
    res.send(html(ReactDOMServer.renderToString(root), path));
  }
);

app.get('/api/getJobs',
  (req, res) => {
    WorkableAPI.getJobs().then((response) => {
      res.send(response)
    });
  }
);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
