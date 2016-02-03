import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as contentAreas } from './content-areas';
import jobs from './jobs';

const rootReducer = combineReducers({
  contentAreas,
  jobs,
  routing: routeReducer
});

export default rootReducer;
