/*
 * Building with Webpack
 *
 * We use Webpack and Babel to build both the client and the server. This
 * allows us to use tools like CSS modules and File Loader so we can just
 * require component related files and have the appropriate transforms for
 * client and server rendering be applied.
 *
 * It also has the benefit that we do not need to bootstrap our server
 * application with babel polyfill and register and results in faster start
 * times on the server.
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const postcss = () => [ cssnext, autoprefixer, dedupe ];

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
  },
  {
    test: /\.(png|jpe?g|eot|ttf|woff|svg)$/,
    exclude: /node_modules/,
    loader: 'file-loader?name=[hash].[ext]'
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
    postcss: postcss,
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
    postcss: postcss,
    plugins: plugins,
    devtool: 'source-map'
  }
];

const testconfig = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: loaders
  },
  postcss: postcss,
  plugins: plugins
};

console.log(process.env.NODE_ENV);

module.exports = process.env.NODE_ENV === 'test' ? testconfig : config;
