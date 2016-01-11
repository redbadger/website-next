"use strict";

const webpack = require('webpack');

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.BannerPlugin(
    'require("source-map-support/register");',
    {
      raw: true,
      entryOnly: false
    }
  )
];

const config = {
  name: 'server',
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
  entry: ['./src/server.js'],
  output: {
    path: 'build/server',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react', 'stage-1' ],
          plugins: [
            [
              'babel-plugin-webpack-loaders',
              {
                config: './config/test.webpack.config.js',
                verbose: false
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
};

module.exports = config;
