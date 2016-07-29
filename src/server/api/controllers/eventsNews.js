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

const basicFields = `
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
  body {
    type
    text
  }
  featureImageFilename
`;

const dateTimeFields = `
  iso
  date
  month
  monthSym
  year
`;

const dateTimeFieldsEvents = `
  startDateTime {
    ${dateTimeFields}
  }
  endDateTime {
    ${dateTimeFields}
  }
`;

const dateTimeFieldsNews = `
  datetime {
    ${dateTimeFields}
  }
`;

const fullEventsQuery = `
  ${basicFields}
  ${dateTimeFieldsEvents}
`;

const fullNewsQuery = `
  ${basicFields}
  ${dateTimeFieldsNews}
`;

export function getNewsItem(req, res) {
  const body = `
    query {
      news(id: "${req.params.id}") {
        ${fullNewsQuery}
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
}

export function getNews(req, res) {
  const body = `
    query {
      allNews {
        ${fullNewsQuery}
      }
    }
  `;

  fetch(badgerBrainEndpoint, getRequestOptions(req, body))
    .then((response) => response.json())
    .then((news) =>
      res.send({ list: news.data.allNews.sort((a, b) =>
        new Date(b.datetime.iso) - new Date(a.datetime.iso)
      ) })
    .catch((err) => {
      res.status(err.status).send(err.message);
    }));
}

export function getEvent(req, res) {
  const body = `
    query {
      event(id: "${req.params.id}") {
        ${fullEventsQuery}
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
}

export function getEvents(req, res) {
  const body = `
    query {
      allEvents {
        ${fullEventsQuery}
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
}
