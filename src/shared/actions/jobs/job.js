import actions from '../actions';
import { fetchJobs } from './';
import { httpError } from '../errors';

const initialState = {};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_JOB_SUCCESS:
      return action.job;
    case actions.FETCH_JOB_FAIL:
      return {};
    default:
      return state;
  }
}

export function fetchSuccessful (job) {
  return {
    type: actions.FETCH_JOB_SUCCESS,
    job
  };
}

export function fetchFailure (error) {
  return {
    type: actions.FETCH_JOB_FAIL,
    error
  };
}

export const fetchJob = (fetch, nextState) => (
  (dispatch, getState) => {
    return dispatch(fetchJobs(fetch))
      .then(() => {
        const job = getState().jobs.find(j => j.slug === nextState.params.id);
        if (job) {
          dispatch(fetchSuccessful(job));
        } else {
          dispatch(fetchFailure());
          return dispatch(httpError(404));
        }
      });
  }
);
