import { couchDb } from '../../../shared/config';
import qs from 'qs';
import moment from 'moment';
import slugify from 'slug';
import request from 'request';

export default class EventsController {
  getEvents = (req, res) => {
    fetch(couchDb.remote.protocol + (process.env.NODE_ENV === 'production' ? (couchDb.remote.host + ':' + couchDb.remote.port) : (couchDb.local.host + ':' + couchDb.local.port)) + '/events/_all_docs?include_docs=true')
      .then((response) => {
        return response.json();
      })
      .then((events) => {
        res.send({list: events.rows.sort(function (a, b) {
          // also sort all events by date
          return new Date(b.doc.datetime.iso) - new Date(a.doc.datetime.iso);
        })});
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  postNewEvent = (req, res) => {
    var clientRes = res;

    var { title,
      strapline,
      featureImageFilename,
      body,
      eventDate,
      eventTime,
      externalTitle,
      externalUrl,
      internalTitle,
      internalUrl } = req.body;

    var eventDateTime = moment(eventDate + ' ' + eventTime , "YYYY-MM-DD HH-mm");
    var slug = slugify(title);
    var internalLinks = [];
    var externalLinks = [];

    if (internalTitle && internalUrl) {
      internalLinks = [{
        "title": internalTitle,
        "url": internalUrl
      }];
    }

    if (externalTitle && externalUrl) {
      externalLinks = [{
        "title": externalTitle,
        "url": externalUrl
      }];
    }

    var newEvent = {
      "attributes": {
        "title": title,
        "strapline": strapline,
        "internalLinks": internalLinks,
        "externalLinks": externalLinks,
        "featureImageFilename": featureImageFilename
      },
      "body": body,
      "datetime": {
        "iso": eventDateTime.format(),
        "date": eventDateTime.format("D"),
        "monthSym": eventDateTime.format("MMM"),
        "month": eventDateTime.format("MM"),
        "year": eventDateTime.format("YYYY"),
        "time": eventDateTime.format("HH:mm")
      },
      "slug": slug
    };

    // An object of options to indicate where to post to

    var postOptions = {
      host: (process.env.NODE_ENV === 'production' ? couchDb.remote.host  : couchDb.local.host),
      port: (process.env.NODE_ENV === 'production' ? couchDb.remote.port  : couchDb.local.port),
      path: '/events'
    };

    request.post({
      url: `http://${postOptions.host}:${postOptions.port}${postOptions.path}`,
      json: newEvent
    }, function (err) {
      if (!err) {
        clientRes.redirect('/about-us/events');
      } else {
        var qSError = qs.stringify({error: 'Something Went wrong'});
        clientRes.redirect('/about-us/events/add/?' + qSError);
      }
    });
  }
}
