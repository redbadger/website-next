import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';

export default function API (workable) {
  const self = express();
  const routes = new Routes(workable);

  self.use( bodyParser.json() );       // to support JSON-encoded bodies
  self.use( bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  self.get('/jobs', routes.getJobs);
  self.get('/events', routes.getEvents);
  self.post('/new-event', routes.postNewEvent);

  return self;
}
