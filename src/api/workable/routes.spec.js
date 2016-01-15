import Routes from './routes';
import { expect } from 'chai';
import sinon from 'sinon';
import isFunction from 'lodash/isFunction';

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

  });
});
