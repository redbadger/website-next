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

export const allNewsFields = `
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

export default class NewsController {
  getNewsItem = (req, res) => {
    const body = `
      query {
        news(id: "${req.params.id}") {
          ${allNewsFields}
        }
      }
    `;

    fetch(badgerBrainEndpoint, getRequestOptions(req, body))
      .then(response => {
        response.json().then(json => {
          res.send(json.data ? json.data.news : json);
        });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  getNews = (req, res) => {
    const body = `
      query {
        allNews {
          ${allNewsFields}
        }
      }
    `;

    fetch(badgerBrainEndpoint, getRequestOptions(req, body))
      .then(response => response.json())
      .then(news => {
        res.send({ list: news.data.allNews.sort((a, b) =>
          new Date(b.datetime.iso) - new Date(a.datetime.iso)
        ) });
      })
      .catch(err => {
        res.status(err.status).send(err.message);
      });
  };
}
