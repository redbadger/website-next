/*
 * Common config for webpack
 */

const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

const tests = glob.sync('./src/*(shared|server)/**/*.spec.js');
const postcss = () => [ cssnext, dedupe ];

const plugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin()
];

function loaders (preset) {
  return [
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: [ preset, 'react', 'stage-1' ]
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
}

const commonClient = {
  module: {
    loaders: loaders('es2015')
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
    loaders: loaders('node5')
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    ...plugins,
    new webpack.BannerPlugin(
      `require("dotenv").load({ silent: true });
       require("source-map-support/register");`,
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
    entry: ['./src/client/index.js'],
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
    entry: ['./src/server/index.js'],
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
