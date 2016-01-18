import express from 'express';
import Routes from './routes';

export default function API (workable) {
  const self = express();
  const routes = new Routes(workable);

  self.get('/jobs', routes.getJobs);

  return self;
}
