import newrelic from 'newrelic'; // eslint-disable-line
import * as config from './config';
import API from './api';
import express from 'express';
import fetch from '../shared/util/fetch-proxy';
import WorkableAPI from './api/workable';
import router from './router';
import authSetup from './authSetup';

const app = authSetup(express());
const workable = new WorkableAPI(fetch(), config.workable.key);
const api = API(workable);

app.use(express.static('static'));

app.use('/assets', express.static('build/assets'));

app.use('/api', api);

app.use(router);

if (!config.hot) {
  app.listen(config.port, function () {
    console.log('Server listening on port', config.port);
  });
}

export default app;
