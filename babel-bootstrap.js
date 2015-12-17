require('babel-polyfill');
require('babel-core/register');
var hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]__[local]_[hash:base64:5]'
});
