const browsers = ['ie >= 8', 'last 2 versions', 'iOS >= 6.1', 'Android >= 2.3', 'ExplorerMobile >= 9'];

const options = {
  columns: 12, // the number of columns in the grid
  maxWidth: 960, // the maximum width of the grid (in px)
  gutter: 20 // the width of the gutter (in px)
};

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

var grid = require('postcss-grid')(options);
var nested = require('postcss-nesting');

module.exports = {
  entry: path.resolve(__dirname, 'app', 'app.js'),

  eslint: {
    configFile: './.eslintrc'
  },

  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
    publicPath: '/',
    libraryTarget: 'umd'
  },

  cssnext: {
    browsers: browsers
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { stage: 0, plugins: ['./build/babelRelayPlugin'] }
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!cssnext-loader')
      }
    ]
  },

  postcss: [
    nested,
    grid
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'app/']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    // `moment` has a contextual require which means **all** of it's locales
    // are automatically pulled into `webpack`. We can tell it to ignore them
    // here as we load our own.
    // https://github.com/webpack/webpack/issues/198
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Loading timezone subset using application here: https://github.com/moment/momentjs.com/issues/187
    // Hopefully moment-timezone will provide their own data-builder soon!
    new webpack.NormalModuleReplacementPlugin(
        /moment-timezone\/data\/packed\/latest.json/,
      path.resolve('./data/timezones.json')
    )
  ]
};
