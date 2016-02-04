import fetch from '../../util/fetch-proxy';
export const FETCH_JOBS_SUCCESS = Symbol();
export const FETCH_JOBS_FAIL = Symbol();

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
  dispatch => {
    return fetch()('http:/localhost:8000/api/jobs')
      .then(jobs => dispatch(fetchSuccessful(jobs)))
      .catch(e => dispatch(fetchFailure(e)));
  }
);
