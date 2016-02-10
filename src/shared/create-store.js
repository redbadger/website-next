import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';

export default (history, initialState = {}) => {
  const reduxRouterMiddleware = syncHistory(history);
  const store = createStore(reducers, initialState, applyMiddleware(reduxRouterMiddleware, thunk));
  return store;
};
