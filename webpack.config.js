var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var fs = require('fs');

module.exports = {
  entry: path.resolve(__dirname, 'js', 'app.js'),

  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'js/components', 'js/components/header']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
