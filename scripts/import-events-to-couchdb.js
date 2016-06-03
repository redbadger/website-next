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
var path = require('path');
var couchEndpoint;

var couchDbHost = process.env.DB_HOST || 'localhost';
var localCouchEndpoint = 'http://' + couchDbHost + ':5984';
couchDbHost = process.env.DB_HOST || 'ec2-54-229-76-71.eu-west-1.compute.amazonaws.com';
var remoteCouchEndpoint = "http://" +  process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + couchDbHost + ":5984/";

var nano = require('nano')(process.env.NODE_ENV === 'production' ? remoteCouchEndpoint : localCouchEndpoint);
var eventsPath = __dirname + '/../src/md/events';

var initialCouchJson = mdToCouch.default({
  dirname: eventsPath,
  parseDate: true
});


// We need to extrapolate filename from the metadata
// so it can be re-used with external image hosting service
var defaultEventImage = 'red-badger-event.jpg';
var couchJson = {
  docs: initialCouchJson.docs.map(function (event) {
    var baseFilename = path.basename(event.filename, '.html.md');
    event.slug = baseFilename.split('-').slice(3).join('-');

    if (event.attributes.featureImage) {
      var filename = path.basename(event.attributes.featureImage);
      event.attributes.featureImageFilename = filename ? filename : defaultEventImage;
    } else {
      event.attributes.featureImageFilename = defaultEventImage;
    }

    return event;
  })
};

var couchCookie = nano.auth(process.env.DB_USERNAME, process.env.DB_PASSWORD, function (err, body, headers) {
  if (err) {
    return console.log(err);
  }

  if (headers && headers['set-cookie']) {
    console.log("CouchDB cookies acquired", headers['set-cookie']);
    var cookieNano = require('nano')(
      { url : (process.env.NODE_ENV === 'production' ? remoteCouchEndpoint : localCouchEndpoint), cookie: headers['set-cookie'] });

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
