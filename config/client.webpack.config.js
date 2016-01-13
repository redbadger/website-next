"use strict";

/*
 * Common config for client
 */

const webpack = require('webpack');
const commonConfig = require('./common.webpack.config.js');
const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const postcss = () => [ cssnext, autoprefixer, dedupe ];

let plugins = [
  ...commonConfig.plugins,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

const config = Object.assign({}, commonConfig, {
  target: 'web',
  plugins: plugins,
  postcss: postcss
});

module.exports = config;
