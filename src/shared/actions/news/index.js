import actions from '../actions';
import { apiEndpoint } from '../../config';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_NEWS_SUCCESS:
      return action.news;
    case actions.FETCH_NEWS_FAIL:
      return [];
    default:
      return state;
  }
}

export function fetchSuccessful(news) {
  return {
    type: actions.FETCH_NEWS_SUCCESS,
    news: news.list,
  };
}

export function fetchFailure(error) {
  return {
    type: actions.FETCH_NEWS_FAIL,
    error,
  };
}

export const fetchNews = (fetch) => (
  (dispatch, getState) => {
    const news = getState().news;

    if (news && news.length > 0) {
      return Promise.resolve(news);
    }

    return fetch(`${apiEndpoint}/news`)
      // eslint-disable-next-line no-shadow
      .then(news =>
        dispatch(fetchSuccessful(news)))
      .catch(e =>
        dispatch(fetchFailure(e)));
  }
);
