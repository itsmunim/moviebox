let ffmpeg = require('fluent-ffmpeg');
let movieUtils = require('md-movie-utils');
let path = require('path');
let _ = require('lodash');

// parser & omdb client
let parser = movieUtils.parser;
let omdbClient = movieUtils.clients.OMDBClient.getInstance('8695ae83');

let getMediaMetadata = function (filepath, callback) {
  ffmpeg.ffprobe(filepath, (err, metadata) => {
    if (err) {
      return callback(err);
    }
    return callback(null, metadata['format']);
  });
};

let getMovieTitleAndYearFromFilePath = function (filePath, callback) {
  let movieInfo = {
    path: filePath
  };

  let fileName = path.basename(filePath);

  try {
    movieInfo = Object.assign({}, movieInfo, parser.parseFromTorrentFileName(fileName));
  } catch (exception) {
    if (exception.message === 'Movie info parsing failed') {
      Object.keys(parser.formats).forEach((k) => {
        let format = parser.formats[k];
        if (format.test(fileName)) {
          movieInfo = Object.assign({}, movieInfo, parser.parseMovieNameAndYear(fileName, format));
        }
      });
    }
  }

  if (!movieInfo.title) {
    // last resort
    movieInfo.title = fileName;
  }

  return callback(null, _.pick(movieInfo, ['title', 'year', 'path']));
};

let getMovieInfoFromTitleAndYear = function (title, year) {
  return omdbClient.getByTitleAndYear(title, year);
};

module.exports = {
  getMediaMetadata,
  getMovieInfoFromTitleAndYear,
  getMovieTitleAndYearFromFilePath: getMovieTitleAndYearFromFilePath
};
