import { couchDbLocal, couchDbRemote } from '../../shared/config';

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
    fetch((process.env.NODE_ENV === 'production' ? couchDbRemote : couchDbLocal) + '/events/_all_docs?include_docs=true')
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
}
