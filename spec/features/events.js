import webdriverio from 'webdriverio';
import chai from 'chai';
import { config } from '../wdio.config';

describe('Checking for Events', () => {
  let client;

  before(() => {
    client = webdriverio.remote(config);
    return client.init();
  });

  after(() => client.end());

  it('will be able to view upcoming events', () => client
    .url('http://localhost:8000/about-us/events')
    .getTitle()
    .then(function (title) {
      chai.expect(title).to.equal('Events | Red Badger');
    })
  );

  it('redirects to Google login page, when you try to add an event and are not logged in', () => client
    .url('/about-us/events/add')
    .getTitle()
    .then(function (title) {
      chai.expect(title).to.equal('Sign in - Google Accounts');
    })
  );
});
