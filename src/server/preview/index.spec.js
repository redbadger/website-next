import sinon from 'sinon';
import { expect } from 'chai';
import { Prismic } from 'express-prismic';
import linkResolvers from './linkResolvers';
import enableDocumentPreview from './';

describe('Preview route', () => {
  let app;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Prismic, 'init');

    for (let name in linkResolvers) {
      sandbox.stub(linkResolvers, name).returns(`/${name}_path`);
    }

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

  it('returns the express app', () => {
    expect(enableDocumentPreview(app)).to.deep.equal(app);
  });

  describe('link resolution', () => {
    let linkResolver;

    beforeEach(() => {
      enableDocumentPreview(app);
      linkResolver = Prismic.init.firstCall.args[0].linkResolver;
    });

    it('returns the return value of the link resolver associated with the given document', () => {
      const doc = { type: 'event' };
      const resolvedPath = linkResolver(doc);

      expect(linkResolvers.event.firstCall.args[0]).to.equal(doc);
      expect(resolvedPath).to.equal(linkResolvers.event.firstCall.returnValue);
    });

    it('returns the root path if the document type does not have a resolver', () => {
      const resolvedPath = linkResolver({ type: 'wibble' });

      expect(resolvedPath).to.equal('/');
    });
  });
});
