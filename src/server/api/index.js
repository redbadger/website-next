import express from 'express';
import Routes from './routes';

export default function API (workable) {
  const self = express();
  const routes = new Routes(workable);

  self.get('/jobs', routes.getJobs);
  self.get('/events', routes.getEvents);

  return self;
}
