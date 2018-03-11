let debug = require('debug');

const getDebugger = function (name) {
  return debug('moviebox' + ':' + name);
};

module.exports = {
  getDebugger
};
