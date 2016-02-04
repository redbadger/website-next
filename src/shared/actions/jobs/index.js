import fetch from '../../util/fetch-proxy';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAIL = 'FETCH_JOBS_FAIL';

const initialState = [];

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return action.jobs;
    case FETCH_JOBS_FAIL:
      return [];
    default:
      return state;
  }
}

export function fetchSuccessful (jobs) {
  return {
    type: FETCH_JOBS_SUCCESS,
    jobs
  };
}

export function fetchFailure (error) {
  return {
    type: FETCH_JOBS_FAIL,
    error
  };
}

export const fetchJobs = () => (
  (dispatch, getState) => {
    const jobs = getState().jobs;

    if (jobs && jobs.length > 0) {
      return Promise.resolve(jobs);
    }

    return fetch()('http://localhost:8000/api/jobs')
      .then(jobs => dispatch(fetchSuccessful(jobs)))
      .catch(e => dispatch(fetchFailure(e)));
  }
);
