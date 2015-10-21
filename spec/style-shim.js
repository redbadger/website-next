/* eslint no-sync: 0 */
// Ignore requires for .css on the Server
var fs = require('fs');
var module = require('module');

require.extensions['.svg'] = function (fileModule, filename) {
  fileModule.exports = fs.readFileSync(filename, { encoding: 'UTF-8' }).trim();
};

var original = module.prototype.require;
module.prototype.require = function (file) {
  if (file.match(/\.(css)$/)) { return {}; }
  if (file.match(/\.(png|jpg|jpeg|gif|woff|eot|ttf)$/)) { return null; }
  return original.apply(this, arguments);
};
