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
const commonConfig = require('./common.webpack.config.js');
const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const postcss = () => [ cssnext, autoprefixer, dedupe ];

const coreConfig = Object.assign({
  postcss: postcss
}, commonConfig);

const config = [
  Object.assign({}, coreConfig, {
    name: 'server',
    target: 'node',
    externals: /^[a-z\-0-9]+$/,
    entry: ['./src/server.js'],
    output: {
      path: 'build',
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    }
  }),
  Object.assign({}, coreConfig, {
    name: 'client',
    target: 'web',
    entry: ['./src/client.js'],
    output: {
      path: 'build',
      filename: 'client.js'
    },
    plugins: [
      ...coreConfig.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
      })
    ]
  })
];

module.exports = config;
