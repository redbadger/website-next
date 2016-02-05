import { requestHandler } from './index';
import sinon from 'sinon';
import { expect } from 'chai';

describe('router middleware', () => {
  describe('request handler', () => {
    it('returns a 200 and renders when route is found', () => {
      const send = sinon.stub();
      const res = { status: sinon.stub().returns({ send }) };
      const store = {};
      const renderer = sinon.stub();
      const props = {};
      const handle = requestHandler(null, res, store, renderer); //req, res, store, render
      handle(null, null, props);

      expect(res.status.calledWith(200)).to.be.true;
      expect(send.called).to.be.true;
      expect(renderer.calledWith(store, props));
    });

    it('returns a 404 when route is not found', () => {
      const send = sinon.stub();
      const res = { status: sinon.stub().returns({ send }) };
      const renderer = sinon.stub();
      const handle = requestHandler(null, res, null, renderer); //req, res, store, render
      handle();

      expect(res.status.calledWith(404)).to.be.true;
      expect(send.called).to.be.true;
    });

    it('returns a 302 when redirectLocation is defined', () => {
      const res = { redirect: sinon.stub() };
      const handle = requestHandler(null, res, null, null); //req, res, store, render
      handle(null, { pathname: '/redirect', search: '' });
      expect(res.redirect.calledWith(302, '/redirect')).to.be.true;
    });

    it('returns a 500 when an error occurs', () => {
      sinon.stub(console, 'error');
      const error = { message: 'Oh, no!' };
      const send = sinon.stub();
      const res = { status: sinon.stub().returns({ send }) };
      const handle = requestHandler(null, res, null, null); //req, res, store, render
      handle(error);
      console.error.restore();
      expect(res.status.calledWith(500)).to.be.true;
      expect(send.called).to.be.true;
    });
  });
});
