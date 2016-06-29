import { badgerBrain } from '../../../shared/config';

const badgerBrainEndpoint =
  process.env.NODE_ENV === 'production'
  ? badgerBrain.remote
  : badgerBrain.local;

const getRequestOptions = (body) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/graphql',
  },
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
  datetime {
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

    fetch(badgerBrainEndpoint, getRequestOptions(body))
      .then((response) => (
        response.json().then((json) => {
          res.send(json.data.event);
        })
      ))
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

    fetch(badgerBrainEndpoint, getRequestOptions(body))
      .then((response) => response.json())
      .then((events) => {
        res.send({ list: events.data.allEvents.sort((a, b) =>
          new Date(b.datetime.iso) - new Date(a.datetime.iso)
        ) });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
