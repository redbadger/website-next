const browsers = ['ie >= 8', 'last 2 versions', 'iOS >= 6.1', 'Android >= 2.3', 'ExplorerMobile >= 9'];

const options = {
  columns: 12, // the number of columns in the grid
  maxWidth: 960, // the maximum width of the grid (in px)
  gutter: 20 // the width of the gutter (in px)
};

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var fs = require('fs');

var grid = require('postcss-grid')(options);

module.exports = {
  entry: path.resolve(__dirname, 'js', 'app.js'),

  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
    publicPath: '/',
    libraryTarget: 'umd'
  },
  cssnext: {
    browsers: browsers,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!cssnext-loader')
      }
    ]
  },

  postcss: [
      grid
    ],

  resolve: {
    modulesDirectories: ['node_modules', 'js/components', 'js/components/header']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
