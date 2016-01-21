import API from './api';
import express from 'express';
import fetch from 'node-fetch';
import fetchProxy from './fetch-proxy';
import Routes from './routes';
import WorkableAPI from './api/workable';
import match from './match';


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

app.get('*', Routes(workable, match));

app.use('/api', api);

app.listen(port, function () {
  console.log('Server listening on port', port); //eslint-disable-line
});
