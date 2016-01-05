var chai = require('chai'),
    browser = global.browser; // comes from wdio

describe('Home page', function () {
  it('should load', function (done) {
    browser
      .url('http://localhost:8080')
      .getTitle()
      .then(function (title) {
        chai.expect(title).to.equal('Red Badger');
      })
      .end(done);
  });
});
