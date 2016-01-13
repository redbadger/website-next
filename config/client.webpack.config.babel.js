/*
 * Common config for client
 */

const clientConfig = require('./common.webpack.config.js').client;

if (process.env.NODE_ENV === 'development' && process.env.HMR === 'true') {
  // The following plugins can't be added to .babelrc as then the server tries to use them
  const babelLoader = clientConfig.module.loaders.find(l => l.loader.startsWith('babel-loader'));

  if (babelLoader.query.plugins == null) {
    babelLoader.query.plugins = [];
  }

  babelLoader.query.plugins = [
    ...babelLoader.query.plugins, [
      'react-transform', {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          // this is important for Webpack HMR:
          locals: ['module']
        }, {
          transform: require.resolve('react-transform-catch-errors'),
          imports: ['react', require.resolve('redbox-react')]
        }]
      }]
  ];

  // This doesn't seem to be able to be passed in during `npm run watch:client`
  clientConfig.output.publicPath = 'http://localhost:8081/';
}

module.exports = clientConfig;
