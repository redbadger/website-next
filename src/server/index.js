import path from 'path';
import express from 'express';
import { createElement as h } from 'react';
import ReactDOMServer from 'react-dom/server';
import html from './html';
import home from '../components/home';

const app = express();

app.use('/public',
  express.static(path.resolve(__dirname, '..', '..', 'public'))
);

app.get('/',
  (req, res) => {
    res.send(html(ReactDOMServer.renderToString(
      h(home, null)
    )));
  }
);

export default app;
