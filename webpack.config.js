const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
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
  }
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

const config = [
  {
    name: 'server',
    target: 'node',
    entry: ['./src/server.js'],
    output: {
      path: 'build',
      filename: 'server.js'
    },
    module: {
      loaders: loaders
    },
    postcss: () => [ cssnext, autoprefixer, dedupe ],
    plugins: plugins,
    devtool: 'source-map'
  },
  {
    name: 'client',
    target: 'web',
    entry: ['./src/client.js'],
    output: {
      path: 'build',
      filename: 'client.js'
    },
    module: {
      loaders: loaders
    },
    postcss: () => [ cssnext, autoprefixer, dedupe ],
    plugins: plugins,
    devtool: 'source-map'
  }
];

module.exports = config;
