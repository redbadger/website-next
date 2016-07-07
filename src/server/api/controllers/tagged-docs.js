import { badgerBrain } from '../../../shared/config';
import { allEventFields } from './events';
import { allNewsFields } from './news';

const badgerBrainEndpoint =
  process.env.NODE_ENV === 'production'
  ? badgerBrain.remote
  : badgerBrain.local;

const getRequestOptions = (req, body) => ({
  method: 'POST',
  headers: Object.assign({}, {
    'Content-Type': 'application/graphql',
  }, req.query.token && {
    'X-Preview': req.query.token,
  }),
  body,
});

export default class TaggedDocsController {
  getTaggedDocs = (req, res) => {
    const body = `
      query {
        allEvents(tag: "${req.params.tag}") {
          ${allEventFields}
        }
        allNews(tag: "${req.params.tag}") {
          ${allNewsFields}
        }
      }
    `;

    fetch(badgerBrainEndpoint, getRequestOptions(req, body))
      .then(response => {
        response.json().then(json => {
          res.send(json.data ? json.data : json);
        });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
