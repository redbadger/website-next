import { combineReducers } from 'redux';
import { reducer as contentAreasReducer} from './content-areas';

const rootReducer = combineReducers({
  contentAreas: contentAreasReducer
});

export default rootReducer;
