const clientConfig = require('./client.webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS', 'Firefox'],
    frameworks: ['mocha'],
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      '../src/**/*.spec.js'
    ],

    preprocessors: {
      '../src/**/*.js': ['webpack']
    },

    webpack: clientConfig,

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
