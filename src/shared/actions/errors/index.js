import actions from '../actions';
import HttpError from '../../util/http-error';

export const httpError = (status) => {
  return {
    type: actions.HTTP_ERROR,
    error: new HttpError(status)
  };
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.HTTP_ERROR:
      return action.error;
    default:
      return state;
  }
};
