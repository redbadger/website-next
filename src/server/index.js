import API from './api';
import express from 'express';
import fetch from '../shared/util/fetch-proxy';
import WorkableAPI from './api/workable';
import router from './router';

const app = express();
const port = process.env.PORT || 8000;
const workable = new WorkableAPI(fetch(), process.env.WORKABLE_KEY);
const api = API(workable);

app.use(express.static('static'));

app.use('/assets', express.static('build/client'));

app.use('/api', api);

app.use(router);

app.listen(port, function () {
  console.log('Server listening on port', port);
});
