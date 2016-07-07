import { expect } from 'chai';
import sinon from 'sinon';
import reducer, { fetchSuccessful, fetchFailure } from './index';
import actions from '../actions';
import HttpError from '../../util/http-error';

describe('taggedDocs actions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetch success', () => {
    it('returns an object containing the taggedDocs and correct type', () => {
      const taggedDocs = {};

      expect(fetchSuccessful(taggedDocs)).to.deep.equal({
        type: actions.FETCH_TAGGED_DOCS_SUCCESS,
        taggedDocs,
      });
    });
  });

  describe('fetch failure', () => {
    it('returns an object containing the taggedDocs and correct type', () => {
      const error = new HttpError(404);

      expect(fetchFailure(error)).to.deep.equal({
        type: actions.FETCH_TAGGED_DOCS_FAIL,
        error,
      });
    });
  });
});

describe('taggedDocs reducer', () => {
  it('returns a default state when the action is unkown', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).to.deep.equal({});
  });

  describe('given a success taggedDocs', () => {
    it('returns the taggedDocs', () => {
      const action = {
        type: actions.FETCH_TAGGED_DOCS_SUCCESS,
        taggedDocs: {},
      };
      expect(reducer(undefined, action)).to.deep.equal(action.taggedDocs);
    });
  });

  describe('given a fail taggedDocs', () => {
    it('returns an empty object', () => {
      const action = {
        type: actions.FETCH_TAGGED_DOCS_FAIL,
        error: new HttpError(404),
      };
      expect(reducer(undefined, action)).to.deep.equal({});
    });
  });
});
