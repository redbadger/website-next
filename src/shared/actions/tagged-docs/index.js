import actions from '../actions';
import { apiEndpoint } from '../../config';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TAGGED_DOCS_SUCCESS:
      return action.taggedDocs;
    case actions.FETCH_TAGGED_DOCS_FAIL:
      return {};
    default:
      return state;
  }
}

export function fetchSuccessful(taggedDocs) {
  return {
    type: actions.FETCH_TAGGED_DOCS_SUCCESS,
    taggedDocs,
  };
}

export function fetchFailure(error) {
  return {
    type: actions.FETCH_TAGGED_DOCS_FAIL,
    error,
  };
}

export const fetchTaggedDocs = (fetch) => (
  (dispatch, getState, nextState) => {
    const { params } = nextState;

    return fetch(`${apiEndpoint}/taggedDocs/${params.tag}`)
      // eslint-disable-next-line no-shadow
      .then(taggedDocs => {
        dispatch(fetchSuccessful(taggedDocs));
      })
      .catch(error => dispatch(fetchFailure(error)));
  }
);
