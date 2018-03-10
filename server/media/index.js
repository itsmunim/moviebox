let ffmpeg = require('fluent-ffmpeg');

let getMediaMetadata = function (filepath, callback) {
  ffmpeg.ffprobe(filepath, (err, metadata) => {
    if (err) {
      return callback(err);
    }
    return callback(null, metadata['format']);
  });
};

module.exports = {
  getMediaMetadata
};
