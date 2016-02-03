import qs from 'query-string';

import { createStore, applyMiddleware } from 'redux';
import { match, createMemoryHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import reducers from '../../shared/reducers';
import getRoutes from '../../shared/routes';

export default((req, res) => {
  const history = createMemoryHistory();
  const reduxRouterMiddleware = syncHistory(history);
  const store = applyMiddleware(reduxRouterMiddleware)(createStore)(reducers);

  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? '?' + query : '');

  store.dispatch(match({ routes: getRoutes(store), location: url }, (error, redirectLocation, routerState) => {
    if (error) {
      console.error('Routing error:', error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send('Route found!');
    }
  }));
});
