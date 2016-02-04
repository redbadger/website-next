import { expect } from 'chai';
import { reducer, fetchSuccessful, fetchFailure, fetchJobs } from './';
import actions from '../actions';

describe('jobs actions', () => {
  describe('fetch success', () => {
    it('returns an object containing jobs and correct type');
  });

  describe('fetch fail', () => {
    it('returns an object containing error and correct type');
  });

  describe('fetch jobs', () => {
    it('returns a function');
  });
});

describe('jobs reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.deep.equal([]);
  });

  it('updates jobs if fetch was successful', () => {

  });

  it('updates jobs if fetch failed', () => {

  });
});
