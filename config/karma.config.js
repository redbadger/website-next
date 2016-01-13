const clientConfig = require('./client.webpack.config.js');

const webpackConfig = Object.assign({}, clientConfig, {
  devtool: 'inline-source-map',
  module: Object.assign({}, clientConfig.module, {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|\.spec\.js)/,
        loader: 'isparta'
      }
    ]
  })
});

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
    webpack: webpackConfig,
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
