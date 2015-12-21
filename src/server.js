import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html from './html';
import Root from './components/root';

const app = express();
const root = (<Root />);
const port = process.env.PORT || 8080;

app.use(
  express.static('build')
);

app.get('/',
  (req, res) => {
    res.send(html(ReactDOMServer.renderToString(root)));
  }
);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
