import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import reducers from '../shared/reducers';
import React from 'react';
import Root from '../shared/containers/root';

const initialStateString = document.getElementById('initialState').textContent;
const initialState = JSON.parse(initialStateString);
const store = createStore(reducers, initialState);

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('mount')
);
