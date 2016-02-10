import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as contentAreas } from './actions/content-areas';
import { reducer as errorReducer } from './actions/errors';
import jobs from './actions/jobs';

const rootReducer = combineReducers({
  contentAreas,
  jobs,
  routing: routeReducer,
  errors: errorReducer
});

export default rootReducer;
