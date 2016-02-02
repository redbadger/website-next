import * as config from './config';
import API from './api';
import express from 'express';
import fetch from '../shared/util/fetch-proxy';
import WorkableAPI from './api/workable';
import router from './router';

const app = express();
const workable = new WorkableAPI(fetch(), config.workable.key);
const api = API(workable);

app.use(express.static('static'));

app.use('/assets', express.static('build/client'));

app.use('/api', api);

app.use(router);

app.listen(config.port, function () {
  console.log('Server listening on port', config.port);
});
