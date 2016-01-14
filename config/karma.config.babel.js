require('babel-core/register');

const clientConfig = require('./common.webpack.config.js').clientTests;

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS', 'Firefox'],
    frameworks: [ 'mocha' ],
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests.webpack.js'
    ],
    preprocessors: {
      './tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [
      'mocha',
      'coverage'
    ],
    coverageReporter: {
      type: 'lcov',
      dir: '../coverage'
    },
    webpack: clientConfig,
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-sourcemap-loader'
    ],
    singleRun: true
  });
};
