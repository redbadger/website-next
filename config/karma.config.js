const webpack = require('webpack');
const commonConfig = require('./common.webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      '../src/**/*.spec.js'
    ],

    preprocessors: {
      '../src/**/*.js': ['webpack']
    },

    webpack: Object.assign({}, commonConfig, {
      plugins: [
        ...commonConfig.plugins,
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
          }
        })
      ]
    }),

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ],
    singleRun: true

  });
};
