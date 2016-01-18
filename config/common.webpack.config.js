/*
 * Common config for webpack
 */

const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

const tests = glob.sync('./src/**/*.spec.js');
const postcss = () => [ cssnext, dedupe ];

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
    loader: 'babel-loader',
    query: {
      cacheDirectory: true
    }
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
          'localIdentName=[name]__[local]_[hash:base64:15]'
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

const commonClient = {
  module: {
    loaders: loaders
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  postcss: postcss
};

if (process.env.NODE_ENV === 'production') {
  commonClient.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

const commonServer = {
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    ...plugins,
    new webpack.BannerPlugin(
      'require("source-map-support/register");',
      {
        raw: true,
        entryOnly: false
      }
    )
  ]
};

module.exports = {
  client: {
    ...commonClient,
    name: 'client',
    devtool: 'source-map',
    target: 'web',
    entry: ['./src/client.js'],
    output: {
      path: 'build/client',
      filename: 'index.js'
    }
  },
  clientTests: {
    ...commonClient,
    devtool: 'inline-source-map',
    module: {
      ...commonClient.module,
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|\.spec\.js)/,
          loader: 'isparta'
        }
      ]
    }
  },
  server: {
    ...commonServer,
    name: 'server',
    entry: ['./src/server.js'],
    output: {
      path: 'build/server',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    }
  },
  serverTests: {
    ...commonServer,
    name: 'test',
    entry: tests,
    output: {
      path: 'build/test',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    }
  }
};
