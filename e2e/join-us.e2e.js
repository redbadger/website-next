import chai from 'chai';

const browser = global.browser; // comes from wdio

describe('Join Us page', function () {
  it('loads', function (done) {
    browser
      .url('/')
      .getTitle()
      .then(function (title) {
        chai.expect(title).to.equal('Join Us | Red Badger');
      })
      .end(done);
  });
});
