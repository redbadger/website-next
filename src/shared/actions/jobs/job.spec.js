import reducer from './job';
import { fetchSuccessful, fetchFailure, fetchJob } from './job';
import actions from '../actions';
import { expect } from 'chai';
import sinon from 'sinon';
import { httpError } from '../errors';

describe('job actions', () => {
  describe('fetch success', () => {
    it('returns an object containing job and correct type', () => {
      expect(fetchSuccessful('job')).to.deep.equal({
        type: actions.FETCH_JOB_SUCCESS,
        job: 'job'
      });
    });
  });

  describe('fetch fail', () => {
    it('returns an object containing error and correct type', () => {
      expect(fetchFailure('error')).to.deep.equal({
        type: actions.FETCH_JOB_FAIL,
        error: 'error'
      });
    });
  });

  describe('fetch job', () => {
    let fetchFn, fetch, nextState;

    beforeEach(() => {
      nextState = {
        params: {}
      };
      fetch = sinon.stub();
      fetchFn = fetchJob(fetch, nextState);
    });

    it('returns a function', () => {
      expect(fetchFn).to.be.a('function');
    });

    describe('inner function', () => {
      let getState, dispatch, state;

      beforeEach(() => {
        dispatch = sinon.stub();
        state = {
          jobs: [{
            slug: 'hello'
          }, {
            slug: 'there'
          }]
        };
        getState = () => state;
      });

      it('returns a promise', () => {
        dispatch.returns(Promise.resolve());

        expect(fetchFn(dispatch, getState).then).to.be.a('function');
      });

      it('dispatches success action if the job exists', (done) => {
        nextState.params.id = 'hello';
        dispatch.returns(Promise.resolve());

        fetchFn(dispatch, getState)
          .then(() => {
            expect(dispatch.calledWithMatch(fetchSuccessful(state.jobs[0]))).to.equal(true);
            done();
          });
      });

      it('dispatches fail action if the job does not exist, resolving with a 404 error', (done) => {
        dispatch.returns(Promise.resolve());

        fetchFn(dispatch, getState)
          .then(() => {
            expect(dispatch.calledWithMatch(httpError(404))).to.equal(true);
            done();
          });
      });
    });
  });
});

describe('job reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({});
  });

  it('updates jobs if fetch was successful', () => {
    const action = {
      type: actions.FETCH_JOB_SUCCESS,
      job: 'job'
    };
    expect(reducer(undefined, action)).to.equal('job');
  });

  it('updates jobs if fetch failed', () => {
    const action = {
      type: actions.FETCH_JOB_FAIL,
      error: 'error'
    };
    expect(reducer(undefined, action)).to.deep.equal({});
  });
});
