import { expect } from 'chai';
import sinon from 'sinon';
import { fetchSuccessful, fetchFailure, fetchEvent } from './event';
import reducer from './event';
import actions from '../actions';
import HttpError from '../../util/http-error';

describe('event actions', () => {
  describe('fetch success', () => {
    it('returns an object containing the event and correct type', () => {
      const event = {};

      expect(fetchSuccessful(event)).to.deep.equal({
        type: actions.FETCH_EVENT_SUCCESS,
        event
      });
    });
  });

  describe('fetch failure', () => {
    it('returns an object containing the event and correct type', () => {
      const error = new HttpError(404);

      expect(fetchFailure(error)).to.deep.equal({
        type: actions.FETCH_EVENT_FAIL,
        error
      });
    });
  });

  describe('fetch event', () => {
    let fetchFn, fetch;

    beforeEach(() => {
      fetch = sinon.stub().returns(Promise.resolve());
      fetchFn = fetchEvent(fetch);
    });

    it('returns a function', () => {
      expect(fetchFn).to.be.a('function');
    });

    describe('inner function', () => {
      let getState, dispatch, state, nextState;

      beforeEach(() => {
        dispatch = sinon.spy();
        state = {
          events: [{
            slug: 'hello'
          }, {
            slug: 'there'
          }]
        };
        nextState = {
          params: {}
        };
        getState = () => state;
      });

      it('dispatches success action if the event exists', (done) => {
        nextState.params.id = 'hello';

        fetchFn(dispatch, getState, nextState)
          .then(() => {
            expect(dispatch.calledWithMatch(fetchSuccessful(state.events[0]))).to.equal(true);
            done();
          });
      });

      it('dispatches fail action if the event does not exist, resolving with a 404 error', (done) => {
        fetchFn(dispatch, getState, nextState)
          .then((err) => {
            expect(dispatch.calledWithMatch(fetchFailure(new HttpError(404)))).to.equal(true);
            expect(err.error).to.be.an.instanceof(HttpError);
            done();
          });
      });
    });
  });
});

describe('event reducer', () => {
  it('returns a default state when the action is unkown', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).to.deep.equal({});
  });

  describe('given a success event', () => {
    it('returns the event', () => {
      const action = {
        type: actions.FETCH_EVENT_SUCCESS,
        event: {}
      };
      expect(reducer(undefined, action)).to.deep.equal(action.event);
    });
  });

  describe('given a fail event', () => {
    it('returns an empty object', () => {
      const action = {
        type: actions.FETCH_EVENT_FAIL,
        error: new HttpError(404)
      };
      expect(reducer(undefined, action)).to.deep.equal({});
    });
  });
});
