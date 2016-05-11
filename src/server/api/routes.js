import { couchDb } from '../../shared/config';


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
    fetch(couchDb + '/events/_all_docs?include_docs=true')
      .then((response) => {
        return response.json();
      })
      .then((events) => {
        res.send({list: events.rows});
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };
}
