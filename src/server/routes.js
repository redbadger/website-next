import html from './html';
import React from 'react';
import reducers from '../shared/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import routes from '../shared/routes';
import ErrorPage from '../shared/containers/error';
import Root from '../shared/containers/root';

function renderComponent (jobs, children) {
  const initialState = { jobs };
  const store = createStore(reducers, initialState);
  const htmlString = renderToString(
    <Provider store={store}>
      {children}
    </Provider>
  );
  return html(htmlString, store.getState(), true);
}

/*
 * @param: workable {Workable}
 * @param: match { {Route, Location} => Promise <Element> }
 */
export default function (workable, match) {
  return (req, res) => {
    Promise.all([
      workable.getJobs(),
      match({ routes, location: req.url })
    ])
    .then(([...args]) => renderComponent(...args) )
    .then(res.send.bind(res))
    .catch(() => {
      res
        .status(500)
        .send(html(renderToString(<Root background="error"><ErrorPage code={500} /></Root>), {}));
    });
  };
}
