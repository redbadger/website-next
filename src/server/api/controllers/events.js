import { badgerBrain } from '../../../shared/config';
import qs from 'qs';
import moment from 'moment';
import slugify from 'slug';
import request from 'request';

export default class EventsController {
  getEvents = (req, res) => {
    fetch('http://127.0.0.1:3001/graphql?query={allEvents{id,slug,title,strapline,internalLinks{title,url},externalLinks{title,url},datetime{iso,date,month,monthSym,year},body{type,text},featureImageFilename}}')
      .then((response) => {
        return response.json();
      })
      .then((events) => {
        console.log('@@@events: ', events);
        res.send({list: events.data.allEvents});
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
      host: (process.env.NODE_ENV === 'production' ? badgerBrain.remote.host  : badgerBrain.local.host),
      port: (process.env.NODE_ENV === 'production' ? badgerBrain.remote.port  : badgerBrain.local.port),
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
