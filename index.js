/*eslint no-console:0*/
require('./babel-bootstrap');

var app = require('./src/server').default;

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Server listening on port', server.address().port);
});
