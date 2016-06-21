import sinon from 'sinon';
import { expect } from 'chai';
import { Prismic } from 'express-prismic';
import enableDocumentPreview from './preview';

describe('Preview route', () => {
  let app;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Prismic, 'init');

    app = {
      get: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('connects to the Red Badger API endpoint', () => {
    enableDocumentPreview(app);

    expect(Prismic.init.firstCall.args[0].apiEndpoint)
      .to.equal('https://rb-website.prismic.io/api');
  });

  it('applies the preview route to the provided express app', () => {
    enableDocumentPreview(app);

    expect(app.get.firstCall.args[0]).to.equal('/preview');
    expect(app.get.firstCall.args[1]).to.equal(Prismic.preview);
  });

  describe('link resolution', () => {
    let linkResolver;

    beforeEach(() => {
      enableDocumentPreview(app);
      linkResolver = Prismic.init.firstCall.args[0].linkResolver;
    });

    it('returns the correct url path for events', () => {
      const resolvedPath = linkResolver({
        uid: 'my-event-title',
        type: 'event',
        data: {
          'event.timestamp': {
            value: '2016-10-22T08:00:00.000Z',
          },
        },
      });
      expect(resolvedPath).to.equal('/about-us/events/2016/10/22/my-event-title');
    });

    it('returns the root path if the document type is not known', () => {
      const resolvedPath = linkResolver({ type: 'wibble' });
      expect(resolvedPath).to.equal('/');
    });
  });
});
