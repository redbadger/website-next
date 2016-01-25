import React from 'react';
import { match as matchRR, RouterContext } from 'react-router';

function renderRouterContext ([, renderProps]) {
  return (
    <RouterContext {...renderProps} />
  );
}

// Turn React Routers match into a promise api and render the RouterContext
export default function match (options) {
  return new Promise(function (resolve, reject) {
    matchRR(options, (error, ...rest) => {
      if (error) {
        return reject(error);
      }
      return resolve(rest);
    });
  }).then(renderRouterContext);
}
