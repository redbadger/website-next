import express from 'express';
import JobsController from './controllers/jobs';
import EventsController from './controllers/events';
import bodyParser from 'body-parser';
import authSetup from '../authSetup';

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403).send('You are not logged in. Please use: /login');
};

export default function API (workable) {
  const self = authSetup(express());
  const jobsController = new JobsController(workable);
  const eventsController = new EventsController();

  self.use( bodyParser.json() );       // to support JSON-encoded bodies
  self.use( bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  self.get('/jobs', jobsController.getJobs);
  self.get('/events', eventsController.getEvents);
  self.post('/new-event', ensureAuthenticated, eventsController.postNewEvent);
  self.get('/check-login', ensureAuthenticated, (req, res) => res.send('OK'));

  return self;
}
