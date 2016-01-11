"use strict";

/*
 * Common config for server and server tests
 */

const webpack = require('webpack');
const commonConfig = require('./common.webpack.config.js');

const config = Object.assign({}, commonConfig, {
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    ...commonConfig.plugins,
    new webpack.BannerPlugin(
      'require("source-map-support/register");',
      {
        raw: true,
        entryOnly: false
      }
    )
  ]
});

module.exports = config;
