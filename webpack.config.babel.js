const path = require('path');
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
  new ExtractTextPlugin('public/main.css'),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin()
];

if(process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

const config = {
  entry: ['./src/client.js'],
  output: {
    filename: 'public/main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
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
    ]
  },
  resolveLoader: {
    fallback:  path.join(__dirname, 'node_modules')
  },
  postcss: () => [ cssnext, autoprefixer, dedupe ],
  plugins: plugins,
  devtool: 'source-map'
};

module.exports = config;
