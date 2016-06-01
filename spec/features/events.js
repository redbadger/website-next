import chai from 'chai';

const browser = global.browser; // comes from wdio

describe('Checking for Events', () => {
  it('will be able to view upcoming events', done => {
    browser
      .url('/about-us/events')
      .getTitle()
      .then(function (title) {
        chai.expect(title).to.equal('Events | Red Badger');
      })
      .end(done);
  });

  it('redirects to Google login page, when you try to add an event and are not logged in', done => {
    browser
      .url('/about-us/events/add')
      .getTitle()
      .then(function (title) {
        chai.expect(title).to.equal('Sign in - Google Accounts');
      })
      .end(done);
  });
});
