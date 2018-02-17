let path = require('path');
let os = require('os');
let fs = require('fs');

let controller = {};

controller.excludePattern = {
  HIDDEN_FILES: /^\..+$/
};

controller.getAll = (dirPath, excludePattern, includeHidden) => {
  excludePattern = excludePattern || includeHidden ? null : controller.excludePattern.HIDDEN_FILES;

  let currentDir = dirPath || os.homedir();
  let data = [];
  return new Promise((resolve, reject) => {
    fs.readdir(currentDir, (err, files) => {
      if (err) {
        console.log(err);
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
            console.log(e);
            return reject(e);
          }
        });

      return resolve(data);
    });
  });
};

module.exports = controller;
