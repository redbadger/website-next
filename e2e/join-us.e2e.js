import chai from 'chai';

const browser = global.browser; // comes from wdio

describe('Join Us page', function () {
  it('loads', function () {
    browser
      .url('/about-us/join-us')
      .getTitle()
      .then(function (title) {
        chai.expect(title).to.equal('Join Us | Red Badger');
      });
  });
});

describe('Job page', function () {
  it('loads', function (done) {
    browser
      .url('/about-us/join-us/software-engineer')
      .getText('h2')
      .then(function (title) {
        chai.expect(title).to.include('Software Engineer');
      })
      .end(done);
  });
});
