const webpack = require('webpack');
const commonConfig = require('./common.webpack.config.js');
const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const postcss = () => [ cssnext, autoprefixer, dedupe ];

const coreConfig = Object.assign({
  postcss: postcss
}, commonConfig);

const config = Object.assign({}, coreConfig, {
  name: 'client',
  target: 'web',
  entry: ['./src/client.js'],
  output: {
    path: 'build/client',
    filename: 'index.js'
  },
  plugins: [
    ...coreConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
});

module.exports = config;
