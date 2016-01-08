const webpack = require('webpack');
const commonConfig = require('./common.webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['mocha'],
    files: [
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
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-firefox-launcher")
    ],
    singleRun: true

  });
};
