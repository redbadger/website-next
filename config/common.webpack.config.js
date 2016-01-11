/*
 * Common config for webpack
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin()
];

const loaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract(
      [
        'css-loader?' + [
          'modules',
          // 'minimize',
          'importLoaders=1',
          'localIdentName=[name]__[local]_[hash:base64:5]'
        ],
        'postcss-loader'
      ].join('!')
    )
  },
  {
    test: /\.(png|jpe?g|eot|ttf|woff|svg)$/,
    exclude: /node_modules/,
    loader: 'file-loader?name=[hash].[ext]'
  }
];

module.exports = {
  module: {
    loaders: loaders
  },
  plugins: plugins,
  devtool: 'source-map'
};
