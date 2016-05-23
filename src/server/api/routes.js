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

    var newEvent = {
      "attributes": {
        "title": req.body.title,
        "strapline": req.body.strapline,
        "internalLinks": [
          {
            "title": "This is a test Link",
            "url": "/about-us/news/2010/08/31/introducing-xpf-a-layout-framework-for-xna/"
          }
        ],
        "featureImageFilename": "red-badger-event.jpg"
      },
      "body": req.body.body,
      "datetime": {
        "locale": "Wed Oct 06 2016 00:00:00 GMT+0100",
        "iso": "2016-10-05T23:00:00.000Z",
        "date": 6,
        "month": "Oct",
        "year": 2016
      },
      "filename": "2010-10-06-windows-phone-user-group-xpf.html.md"
    };

    newEvent = JSON.stringify(newEvent);


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
        chunk = JSON.parse(chunk)
        if (chunk.ok) {
          console.log('$$$ Chunk ok!')
          console.log('res: ', res)
        } else {
          console.log('$$$ Chunk not ok!')
          // Error
        }
      });
    });

    // post the data
    post_req.write(newEvent);
    post_req.end();
  }
}
