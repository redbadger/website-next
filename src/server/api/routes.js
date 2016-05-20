import { couchDbLocal, couchDbRemote } from '../../shared/config';

// Using old school require because of https://github.com/moment/moment/issues/2608
const moment = require('moment');

const today = moment().toISOString();
const fiveYearsFromNow = moment().add(5, 'years').toISOString();

export default class Routes {
  constructor (workable) {
    this.workable = workable;
  }

  getJobs = (req, res) => {
    this.workable.getJobs()
      .then(res.send.bind(res))
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  getEvents = (req, res) => {
    fetch((process.env.NODE_ENV === 'production' ? couchDbRemote : couchDbLocal) + '/events/_design/date/_view/by_date?include_docs=true&startkey="' + today + '"&endkey="' + fiveYearsFromNow + '"')
      .then((response) => {
        return response.json();
      })
      .then((events) => {
        res.send({list: events.rows.reverse()});
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
