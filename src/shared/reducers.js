import { combineReducers } from 'redux';
import { reducer as contentAreas } from './content-areas';
import jobs from './jobs';

const rootReducer = combineReducers({
  contentAreas,
  jobs
});

export default rootReducer;
