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

const sortNews = (list) =>
  list.sort((a, b) =>
    new Date(b.datetime.iso) - new Date(a.datetime.iso));

const sortEvents = (list) =>
  list.sort((a, b) =>
    new Date(b.startDateTime.iso) - new Date(a.startDateTime.iso));

export function getNewsItem(req, res) {
  const body = `
    query {
      news(id: "${req.params.id}") {
        ${fullNewsQuery}
      }
    }
  `;

  fetch(badgerBrainEndpoint, getRequestOptions(req, body))
    .then((response) => response.json())
    .then((json) =>
        res.send(json.data ? json.data.news : json)
    .catch((err) =>
      res.status(err.status).send(err.message)
    ));
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
      res.send({ list: sortNews(news.data.allNews) })
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
      res.send({ list: sortEvents(events.data.allEvents) });
    })
    .catch((err) => {
      res.status(err.status).send(err.message);
    });
}

export function getTags(req, res) {
  const body = `
    query {
      allEvents {
        ${fullEventsQuery}
      }
      allNews {
        ${fullNewsQuery}
      }
    }
  `;

  fetch(badgerBrainEndpoint, getRequestOptions(req, body))
    .then((response) => response.json())
    .then((tags) => {
      res.send({
        events: {
          list: sortEvents(tags.data.allEvents),
        },
        news: {
          list: sortNews(tags.data.allNews),
        },
      });
    })
    .catch((err) => {
      res.status(err.status).send(err.message);
    });
}
