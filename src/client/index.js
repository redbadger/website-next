import getRoutes from '../shared/routes';
import createStore from '../shared/create-store';
import styles from './style.css';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';

import { googleAnalyticsUA } from '../shared/config';

import * as ReactGA from 'react-ga';
ReactGA.initialize(googleAnalyticsUA);

const initialStateString = document.getElementById('initialState').textContent;
const initialState = JSON.parse(initialStateString);
const store = createStore(browserHistory, initialState);

const mountNode = document.getElementById('mount');

match({
  routes: getRoutes(store),
  location: window.location,
  history: browserHistory,
}, (error, redirectLocation, renderProps) => {
  const routerUpdate = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);

    if (renderProps && !(store.getState().routing.location.hash)) {
      // Scroll to top when a hash doesn't exist, and we're on a valid route.
      window.scrollTo(0, 0);
    }
  };

  const Application = (
    <div>
      <div className={styles.accessibilityBar}>
        <button onClick={() => document.documentElement.classList.toggle('accessibilityDay')}>Gimme back my colour</button>
        <p>Some text about what this is, Global Accessibility Day etc</p>
      </div>
      <Provider store={store}>
        <Router {...renderProps}
          history={browserHistory}
          onUpdate={routerUpdate} />
      </Provider>
    </div>
  );

  render(Application, mountNode);
});
