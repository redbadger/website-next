import actions from '../actions';
import { fetchEvents } from './';
import HttpError from '../../util/http-error';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_EVENT_SUCCESS:
      return action.event;
    case actions.FETCH_EVENT_FAIL:
      return {};
    default:
      return state;
  }
}

export function fetchSuccessful(event) {
  return {
    type: actions.FETCH_EVENT_SUCCESS,
    event,
  };
}

export function fetchFailure(error) {
  return {
    type: actions.FETCH_EVENT_FAIL,
    error,
  };
}

export const fetchEvent = (fetch) => (
  (dispatch, getState, nextState) => {
    return fetchEvents(fetch)(dispatch, getState)
      .then(() => {
        const event = getState().events.find(j => {
          return j.slug === nextState.params.slug;
        });
        if (event) {
          dispatch(fetchSuccessful(event));
        } else {
          const error = new HttpError(404);
          dispatch(fetchFailure(error));
          return { error };
        }
);
