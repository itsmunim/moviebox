let path = require('path'),
  fs = require('fs'),
  os = require('os'),
  recursiveReadDir = require('recursive-readdir');

const defaultExcludePattern = {
  HIDDEN_FILES: /^\..+$/
};
const SUPPORTED_MEDIA = ['.mkv', '.mp4'];

let list = (dirPath, excludePattern, includeHidden) => {
  excludePattern = excludePattern || includeHidden ? null : defaultExcludePattern.HIDDEN_FILES;

  let currentDir = dirPath || os.homedir();
  let data = [];
  return new Promise((resolve, reject) => {
    fs.readdir(currentDir, (err, files) => {
      if (err) {
        return reject(err);
      }

      files
        .forEach((file) => {
          if (excludePattern && excludePattern.test(file)) return;
          try {
            let filePath = path.join(currentDir, file);
            let isDirectory = fs.statSync(filePath).isDirectory();

            let fileInfo = {
              name: file,
              path: filePath,
              ext: isDirectory ? '' : path.extname(file),
              isDirectory: isDirectory
            };

            data.push(fileInfo);
          } catch (e) {
            return reject(e);
          }
        });

      return resolve(data);
    });
  });
};

let scanForMedia = function (root, callback) {
  let ignoreFunc = function (file, stats) {
    return !stats.isDirectory() && !SUPPORTED_MEDIA.includes(path.extname(file).toLowerCase());
  };
  recursiveReadDir(root, [ignoreFunc], (err, mediaFilePaths) => {
    if (err) {
      return callback(err);
    }
    return callback(null, mediaFilePaths);
  });
};

module.exports = {
  list,
  scanForMedia
};
