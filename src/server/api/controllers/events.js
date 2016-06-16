import { badgerBrain } from '../../../shared/config';
import qs from 'qs';
import moment from 'moment';
import slugify from 'slug';
import request from 'request';

export default class EventsController {
  getEvents = (req, res) => {
    fetch('http://127.0.0.1:3001/graphql?query={allEvents{id,slug,title,strapline,internalLinks{title,url},externalLinks{title,url},datetime{iso,date,month,monthSym,year},body{type,text},featureImageFilename}}')
      .then((response) => response.json())
      .then((events) => {
        console.log('@@@events: ', JSON.stringify(events));
        res.send({ list: events.data.allEvents });
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
