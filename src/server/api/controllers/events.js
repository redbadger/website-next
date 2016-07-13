import { badgerBrain } from '../../../shared/config';

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

const allEventFields = `
  id
  slug
  tags
  title
  strapline
  internalLinks {
    title
    url
  }
  externalLinks {
    title
    url
  }
  startDateTime {
    iso
    date
    month
    monthSym
    year
  }
  endDateTime {
    iso
    date
    month
    monthSym
    year
  }
  body {
    type
    text
  }
  featureImageFilename
`;

export default class EventsController {
  getEvent = (req, res) => {
    const body = `
      query {
        event(id: "${req.query.id}") {
          ${allEventFields}
        }
      }
    `;

    fetch(badgerBrainEndpoint, getRequestOptions(req, body))
      .then((response) => {
        response.json().then((json) => {
          res.send(json.data ? json.data.event : json);
        });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  getEvents = (req, res) => {
    const body = `
      query {
        allEvents {
          ${allEventFields}
        }
      }
    `;

    fetch(badgerBrainEndpoint, getRequestOptions(req, body))
      .then((response) => response.json())
      .then((events) => {
        res.send({ list: events.data.allEvents.sort((a, b) =>
          new Date(b.startDateTime.iso) - new Date(a.startDateTime.iso)
        ) });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
