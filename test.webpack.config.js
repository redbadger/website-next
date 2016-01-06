const normalConfig = require('./webpack.config.js')[0];
const testConfig = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: normalConfig.module,
  plugins: normalConfig.plugins
};

module.exports = testConfig;
