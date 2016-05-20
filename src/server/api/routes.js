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
        res.send({list: events.rows.reverse()});
      })
      .catch((err) => {
        res.status(err.status).send(err.message);
      });
  };

  postNewEvent = (req, res) => {


    const newEvent = JSON.stringify(req.body)

    console.log('$$$ newEvent : ', newEvent)

    var JSONObj =  JSON.stringify({ "title ":"test1", "description":'test2' });

    var myHeaders = {
      "Accept": "application/json",
      "Content-Length": 81,
      "Content-Type": "application/json"
    }

    fetch((process.env.NODE_ENV === 'production' ? couchDbRemote : couchDbLocal) + '/events/', {
      "method": "POST",
      "headers": myHeaders,
      "body": JSONObj
    })
    .then((response) => {
      console.log('response: ', response)
      return response.json();
    })
    // .then((events) => {
    //   res.send({list: events.rows.reverse()});
    // })
    .catch((err) => {
      console.log('err: ', err)
      res.status(err.status).send(err.message);
    });
  }
}
