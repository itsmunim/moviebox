let debug = require('debug'),
  glob = require('globby'),
  path = require('path'),
  constants = require('../constants');

const getDebugger = (name) => {
  return debug('moviebox' + ':' + name);
};

const loadModule = function (moduleName) {
  let loaded = {};
  let modulePath = path.join(constants.APP_ROOT, moduleName);
  glob.sync(modulePath + '/**/*.js', {ignore: ['index.js']}).forEach((file) => {
    let name = path.basename(file, '.js').replace(/(\.[a-z])/g, m => m.replace('.', '').toUpperCase());
    loaded[name] = require(path.resolve(file));
  });

  return loaded;
};

module.exports = {
  getDebugger,
  loadModule
};
