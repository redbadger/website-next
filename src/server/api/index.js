import express from 'express';
import JobsController from './controllers/jobs';
import EventsController from './controllers/events';
import NewsController from './controllers/news';
import TaggedDocsController from './controllers/tagged-docs';
import bodyParser from 'body-parser';

export default function createApi(workable) {
  const api = express();
  const jobsController = new JobsController(workable);
  const eventsController = new EventsController();
  const newsController = new NewsController();
  const taggedDocsController = new TaggedDocsController();

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  api.get('/jobs', jobsController.getJobs);
  api.get('/event', eventsController.getEvent);
  api.get('/events', eventsController.getEvents);
  api.get('/news', newsController.getNews);
  api.get('/news/:id', newsController.getNewsItem);
  api.get('/taggedDocs/:tag', taggedDocsController.getTaggedDocs);

  return api;
}
