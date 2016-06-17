import { badgerBrain } from '../../../shared/config';

export default class EventsController {
  getEvents = (req, res) => {
    const fetchInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: `
        query {
          allEvents {
            id
            slug
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
          }
        }
      `,
    };

    const endpoint = process.env.NODE_ENV === 'production' ? badgerBrain.remote : badgerBrain.local;

    fetch(endpoint, fetchInit)
      .then((response) => response.json())
      .then((events) => {
        res.send({ list: events.data.allEvents });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
