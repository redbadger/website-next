import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as contentAreas } from './actions/content-areas';
import jobs from './actions/jobs';
import event from './actions/events/event';
import events from './actions/events';

const rootReducer = combineReducers({
  contentAreas,
  jobs,
  event,
  events,
  routing: routeReducer,
});

export default rootReducer;
