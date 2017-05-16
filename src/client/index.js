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

const handleClick = () => {
  const colourOnButtonText = 'Make my day accessible';
  const colourOnDescription = 'Lorem ipsum dolor';
  const colourOffButtonText = 'Gimme back my colour';
  const colourOffDescription = 'Some text about what this is, Global Accessibility Day etc';

  const button = document.getElementById('accessibilityDayButton');
  const description = document.getElementById('accessibilityDayDescription');

  document.documentElement.classList.toggle('accessibilityDay');

  if (button.innerHTML === colourOffButtonText) {
    button.innerHTML = colourOnButtonText;
  } else {
    button.innerHTML = colourOffButtonText;
  }
  if (description.innerHTML === colourOffDescription) {
    description.innerHTML = colourOnDescription;
  } else {
    description.innerHTML = colourOffDescription;
  }
};

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
        <button id="accessibilityDayButton" onClick={handleClick}>Gimme back my colour</button>
        <p id="accessibilityDayDescription">Some text about what this is, Global Accessibility Day etc</p>
      </div>
      <div className={styles.app}>
        <Provider store={store}>
          <Router {...renderProps}
            history={browserHistory}
            onUpdate={routerUpdate} />
        </Provider>
      </div>
    </div>
  );

  render(Application, mountNode);
});
