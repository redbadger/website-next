import Routes from './routes';
import { expect } from 'chai';
import sinon from 'sinon';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import HttpError from '../http-error';

describe('Workable Routes', () => {
  describe('getJobs', () => {

    let mockWorkable;
    let routes;
    let req;
    let res;

    beforeEach(() => {
      req = {};
      res = {};
      mockWorkable = {
        getJobs: sinon.stub()
      };
      routes = new Routes(mockWorkable);
    });

    it('is a function', () => {
      expect(isFunction(routes.getJobs)).to.be.true;
    });

    describe('when workable.getJobs resolves', () => {

      it('calls response.send with resolved value', (done) => {
        res.send = (value) => {
          expect(value).to.equal('test');
          done();
        };
        mockWorkable.getJobs.returns(Promise.resolve('test'));
        routes.getJobs(req, res);
      });

    });

    describe('when workable.getJobs rejects', () => {

      let error;

      beforeEach(() => {
        error = new HttpError(500);
        res.status = () => { return res; };
        res.send = noop;
        mockWorkable.getJobs.returns(Promise.reject(error));
      });

      it('calls response.status with error status', (done) => {
        res.status = (value) => {
          expect(value).to.equal(error.status);
          done();
        };
        routes.getJobs(req, res);
      });

      it('calls response.send with error message', (done) => {
        res.send = (value) => {
          expect(value).to.equal(error.message);
          done();
        };
        routes.getJobs(req, res);
      });

    });

  });
});
