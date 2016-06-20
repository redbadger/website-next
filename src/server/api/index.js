import express from 'express';
import JobsController from './controllers/jobs';
import EventsController from './controllers/events';
import bodyParser from 'body-parser';
import authSetup from '../authSetup';

// eslint-disable-next-line consistent-return
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403).send('You are not logged in. Please use: /auth/login');
};

export default function createApi(workable) {
  const api = authSetup(express());
  const jobsController = new JobsController(workable);
  const eventsController = new EventsController();

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  api.get('/jobs', jobsController.getJobs);
  api.get('/events', eventsController.getEvents);
  api.get('/check-login', ensureAuthenticated, (req, res) => res.send('OK'));

  return api;
}
