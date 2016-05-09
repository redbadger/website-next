// Prepare CouchDB. Assuming it is running locally.
// 1. Delete `events` database
// 2. Create `events` database
// 3. Populate `events` database with the data parsed from
// markdown files from the old website
//
// This script will eventually become obsolete, once we have
// completely migrated to use new events management pipeline.

/* eslint-disable no-console, no-unused-vars */

var mdToCouch = require('md-to-couch');
var nano = require('nano')('http://127.0.0.1:5984');

var couchJson = mdToCouch.default(__dirname + '/../src/md/events');

var couchCookie = nano.auth(process.env.DB_USERNAME, process.env.DB_PASSWORD, function (err, body, headers) {
  if (err) {
    return console.log(err);
  }

  if (headers && headers['set-cookie']) {
    console.log("CouchDB cookies acquired", headers['set-cookie']);
    var cookieNano = require('nano')(
      { url : 'http://localhost:5984/', cookie: headers['set-cookie'] });

    cookieNano.db.destroy('events', function (err) {
      console.log('events DB destroyed');
      cookieNano.db.create('events', function (err, body) {
        if (!err) {
          console.log('events DB created');
          var db = cookieNano.use('events');

          var options = {
            "all_or_nothing": true
          };

          db.bulk(couchJson, options, function (err, response) {
            if (!err) {
              console.log('SUCCESSFULLY POPULATED EVENTS DB');
            } else {
              console.log(err);
            }
          });

        } else {
          console.log(err);
        }
      });
    });

  } else {
    console.log('Failed to authenticate into CouchDB instance');
  }
});

