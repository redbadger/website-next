import fetchJSON from './fetch-json';
import { expect } from 'chai';
import sinon from 'sinon';

describe.only('Fetch JSON', () => {
  it('returns a function', () => {
    expect(fetchJSON()).to.be.a('function');
  });

  describe('function', () => {
    let fetchFunction;
    let response;

    beforeEach(() => {
      fetchFunction = sinon.stub();
      response = {
        json: sinon.stub().returns(Promise.resolve('data')),
        status: 200
      };
    });

    it('calls fetch with the same arguments as it received', () => {
      fetchFunction.returns(Promise.resolve());
      fetchJSON(fetchFunction)('abc', 123);
      expect(fetchFunction.calledWith('abc', 123)).to.equal(true);
    });

    describe('when fetch gets rejected', () => {
      it('rejects with status 500', (done) => {
        fetchFunction.returns(Promise.reject('error'));
        fetchJSON(fetchFunction)().catch((err) => {
          expect(err).to.deep.equal({
            status: 500,
            body: {
              error: 'Network Error'
            }
          });
          done();
        });
      });
    });

    describe('when fetch gets resolved with an error code', () => {
      it('rejects with 401', (done) => {
        response.status = 401;
        fetchFunction.returns(Promise.resolve(response));
        fetchJSON(fetchFunction)().catch((err) => {
          expect(err).to.deep.equal({
            status: 401,
            body: {
              error: 'Not Authorised'
            }
          });
          done();
        });
      });

      it('rejects with 404', (done) => {
        response.status = 404;
        fetchFunction.returns(Promise.resolve(response));
        fetchJSON(fetchFunction)().catch((err) => {
          expect(err).to.deep.equal({
            status: 404,
            body: {
              error: 'Not Found'
            }
          });
          done();
        });
      });

      it('rejects any other error codes with a default error', (done) => {
        response.status = 300003;
        fetchFunction.returns(Promise.resolve(response));
        fetchJSON(fetchFunction)().catch((err) => {
          expect(err).to.deep.equal({
            status: 300003,
            body: {
              error: 'Error'
            }
          });
          done();
        });
      });
    });

    describe('when fetch gets resolved with status 200', () => {
      it('wraps the data, parses them into json and resolves', (done) => {
        fetchFunction.returns(Promise.resolve(response));
        fetchJSON(fetchFunction)().then((res) => {
          expect(res).to.deep.equal({
            status: 200,
            body: 'data'
          });
          done();
        });
      });
    });
  });
});