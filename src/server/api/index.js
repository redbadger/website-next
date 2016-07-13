import express from 'express';
import JobsController from './controllers/jobs';
import EventsController from './controllers/events';
import bodyParser from 'body-parser';

export default function createApi(workable) {
  const api = express();
  const jobsController = new JobsController(workable);
  const eventsController = new EventsController();

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  api.get('/jobs', jobsController.getJobs);
  api.get('/event/:id', eventsController.getEvent);
  api.get('/events', eventsController.getEvents);

  return api;
}
