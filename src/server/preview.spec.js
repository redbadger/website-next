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

    expect(Prismic.init.firstCall.args[0].apiEndPoint)
      .to.equal('https://rb-website.prismic.io');
  });

  it('provides a default link resolver', () => {
    enableDocumentPreview(app);

    const linkResolver = Prismic.init.firstCall.args[0].linkResolver;

    expect(linkResolver()).to.equal(false);
  });

  it('applies the preview route to the provided express app', () => {
    enableDocumentPreview(app);

    expect(app.get.firstCall.args[0]).to.equal('/preview');
    expect(app.get.firstCall.args[1]).to.equal(Prismic.preview);
  });
});
