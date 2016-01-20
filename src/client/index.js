import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import reducers from '../shared/reducers';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';

const initialStateString = document.getElementById('initialState').textContent;
const initialState = JSON.parse(initialStateString);
const store = createStore(reducers, initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('mount')
);
