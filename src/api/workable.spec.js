import Workable from './workable';
import { expect } from 'chai';
import sinon from 'sinon';
import fixture from '../fixtures/workable';

describe('Workable API', () => {
  describe('getJobs', () => {

    let api;
    let mockFetch;

    beforeEach(() => {
      mockFetch = sinon.stub();
      api = new Workable(mockFetch, 'key');
    });

    describe('resolves', () => {
      let result;

      beforeEach(() => {
        mockFetch.returns(Promise.resolve(fixture));
        result = api.getJobs();
      });

      it('returns a promise', () => {
        expect(result).to.be.an.instanceof(Promise);
      });

      it('requests job with description', () => {
        expect(mockFetch.calledWith('https://www.workable.com/spi/v3/accounts/redbadger/jobs?include_fields=description')).to.equal(true);
      });

      it('requests jobs with an authorization header', () => {
        expect(mockFetch.lastCall.args[1]).to.deep.equal({
          headers: {
            authorization: 'Bearer key'
          }
        });
      });

      it('resolves promise to an array of jobs', (done) => {
        result.then((jobs) => {
          expect(jobs).to.be.an('array');
          done();
        });
      });

      it('filters job data to contain only title and description', (done) => {
        result.then((jobs) => {
          expect(jobs[0]).to.deep.equal({
            title: fixture.jobs[0].title,
            description: fixture.jobs[0].description
          });
          done();
        });
      });
    });

    it('rejects promise if there is an error', (done) => {
      mockFetch.returns(Promise.reject('error'));
      api.getJobs().catch((error) => {
        expect(error).to.equal('error');
        done();
      });
    });
  });
});