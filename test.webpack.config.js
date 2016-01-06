const commonConfig = require('./common.webpack.config.js');

module.exports = Object.assign({
  output: {
    libraryTarget: 'commonjs2'
  }
}, commonConfig);
