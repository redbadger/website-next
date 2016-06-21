import { couchDb } from '../../../shared/config';
import qs from 'query-string';
import moment from 'moment';
import slugify from 'slug';
import request from 'request';

const db = (() => {
  const config = (process.env.NODE_ENV === 'production')
    ? couchDb.remote
    : couchDb.local;

  return {
    ...config,
    buildUrl: path => (
      `${config.protocol}${config.host}:${config.port}/${path}`
    ),
  };
})();

export default class EventsController {
  getEvents = (req, res) => {
    fetch(db.buildUrl('events/_all_docs?include_docs=true'))
      .then(response => response.json())
      .then((events) => {
        res.send({
          list: events.rows.sort((a, b) => (
            new Date(b.doc.datetime.iso) - new Date(a.doc.datetime.iso)
          )),
        });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  postNewEvent = (req, res) => {
    const {
      title,
      strapline,
      featureImageFilename,
      body,
      eventDate,
      eventTime,
      externalTitle,
      externalUrl,
      internalTitle,
      internalUrl,
    } = req.body;

    const dateTime = moment(`${eventDate} ${eventTime}`, 'YYYY-MM-DD HH-mm');

    const internalLinks = (internalTitle && internalUrl) ? [{
      title: internalTitle,
      url: internalUrl,
    }] : [];

    const externalLinks = (externalTitle && externalUrl) ? [{
      title: externalTitle,
      url: externalUrl,
    }] : [];

    const newEvent = {
      attributes: {
        title,
        strapline,
        internalLinks,
        externalLinks,
        featureImageFilename,
      },
      body,
      datetime: {
        iso: dateTime.format(),
        date: dateTime.format('D'),
        monthSym: dateTime.format('MMM'),
        month: dateTime.format('MM'),
        year: dateTime.format('YYYY'),
        time: dateTime.format('HH:mm'),
      },
      slug: slugify(title),
    };

    request.post({
      url: db.buildUrl('events'),
      json: newEvent,
    }, (err) => {
      if (!err) {
        res.redirect('/about-us/events');
      } else {
        const errorQueryStr = qs.stringify({ error: 'Something Went wrong' });
        res.redirect(`/about-us/events/add/?${errorQueryStr}`);
      }
    });
  }
}
