import { couchDbLocal, couchDbRemote } from '../../shared/config';
import http from 'http';

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

    // An object of options to indicate where to post to
    var post_options = {
      host: '127.0.0.1',
      port: '5984',
      path: '/events',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(newEvent)
      }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
        if (chunk.ok) {
          // Success!
        } else {
          // Error
        }
      });
    });

    // post the data
    post_req.write(newEvent);
    post_req.end();
  }
}
