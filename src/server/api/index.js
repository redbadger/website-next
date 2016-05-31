import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';
import authSetup from '../authSetup';

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403).end('You are not logged in. Please use: /login');
};

export default function API (workable) {
  const self = authSetup(express());
  const routes = new Routes(workable);

  self.use( bodyParser.json() );       // to support JSON-encoded bodies
  self.use( bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  self.get('/jobs', routes.getJobs);
  self.get('/events', routes.getEvents);
  self.post('/new-event', ensureAuthenticated, routes.postNewEvent);
  self.get('/check-login', ensureAuthenticated, (req, res) => res.send('OK'));

  return self;
}
