let path = require('path'),
  fs = require('fs'),
  os = require('os'),
  glob = require('globby'),
  _ = require('lodash');

const defaultExcludePattern = {
  HIDDEN_FILES: /^\..+$/
};
const SUPPORTED_MEDIA = ['.mkv', '.mp4'];

let list = (dirPath, excludePattern, includeHidden) => {
  excludePattern = excludePattern || includeHidden ? null : defaultExcludePattern.HIDDEN_FILES;

  let currentDir = dirPath || os.homedir();
  let data = [];
  return new Promise((resolve, reject) => {
    if (!fs.lstatSync(currentDir).isDirectory()) {
      return reject(new Error('Given path is not a valid directory.'));
    }

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

/**
 * Scan for movie files.
 * @param {string} root Where the scan will begin
 * @param {string} excludeDirs Comma separated name of dirs that resides any level in current root
 * that should be excluded from scan.
 * @param {function} callback
 */
let scanForMedia = function (root, excludeDirs, callback) {
  let dirnamesToIgnore = [];

  if (!_.isEmpty(excludeDirs)) {
    dirnamesToIgnore = excludeDirs.split(',').map(name => root + '/**/' + name.trim() + '/**');
  }

  let fileSearchGlobs = SUPPORTED_MEDIA.map(ext => root + '/**/*' + ext);
  let filePaths = [];

  try {
    filePaths = glob.sync(fileSearchGlobs, {ignore: dirnamesToIgnore});
    return callback(null, filePaths);
  } catch (err) {
    return callback(err, filePaths);
  }
};

let getMimeType = function (filePath) {
  let mimeTypes = {
    '.m3u': 'application/x-mpegurl',
    '.m3u8': 'application/x-mpegurl',
    '.3gp': 'video/3gpp',
    '.mp4': 'video/mp4',
    '.m4a': 'video/mp4',
    '.m4p': 'video/mp4',
    '.m4b': 'video/mp4',
    '.m4r': 'video/mp4',
    '.m4v': 'video/x-m4v',
    '.m1v': 'video/mpeg',
    '.ogg': 'video/ogg',
    '.ogv': 'video/ogg',
    '.mov': 'video/quicktime',
    '.qt': 'video/quicktime',
    '.webm': 'video/webm',
    '.asf': 'video/ms-asf',
    '.wmv': 'video/x-ms-wmv',
    '.avi': 'video/x-msvideo',
    '.flv': 'video/x-flv'
  };

  return mimeTypes[path.extname(path.basename(filePath)).toLowerCase()];
};

module.exports = {
  list,
  scanForMedia,
  getMimeType
};
