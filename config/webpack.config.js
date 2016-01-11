/*
 * Building with Webpack
 *
 * We use Webpack and Babel to build both the client, server and tests. This
 * allows us to use tools like CSS modules and File Loader so we can just
 * require component related files and have the appropriate transforms for
 * client and server rendering be applied.
 *
 * It also has the benefit that we do not need to bootstrap our server
 * application with babel polyfill and register and results in faster start
 * times on the server.
 *
 * The major drawback with this approach is that we are outputting the files
 * for each of these targets. Webpack does not currently support a way to just
 * transform the import call without also outputting the file.
 */

const glob = require('glob');
const clientConfig = require('./client.webpack.config.js');
const serverConfig = require('./server.webpack.config.js');
const tests = glob.sync('./src/**/*.spec.js');

const config = [
  Object.assign({
    name: 'client',
    target: 'web',
    entry: ['./src/client.js'],
    output: {
      path: 'build/client',
      filename: 'index.js'
    }
  }, clientConfig),
  Object.assign({
    name: 'server',
    entry: ['./src/server.js'],
    output: {
      path: 'build/server',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    }
  }, serverConfig),
  Object.assign({
    name: 'test',
    entry: tests,
    output: {
      path: 'build/test',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    }
  }, serverConfig)
];

module.exports = config;
