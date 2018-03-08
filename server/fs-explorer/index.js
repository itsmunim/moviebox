let path = require('path'),
  recursiveReadDir = require('recursive-readdir');

const SUPPORTED_MEDIA = ['.mkv', '.mp4'];

let scanForMedia = function (root, callback) {
  let ignoreFunc = function (file, stats) {
    return !stats.isDirectory() && !SUPPORTED_MEDIA.includes(path.extname(file));
  }
  recursiveReadDir(root, [ignoreFunc], (err, mediaFilePaths) => {
    if (err) {
      return callback(err);
    }
    return callback(null, mediaFilePaths);
  });
}

module.exports = {
  scanForMedia
};
