import ptn from 'parse-torrent-name';
import _ from 'lodash';
import * as DataStructures from '../classes/index';

class MovieInfoExtractor {
  static getMovieInfo(movieFileName) {
    movieFileName = movieFileName.replace(/\.(mp4|mkv|avi|wmv|flv)/, '');
    let rawInfo = ptn(movieFileName);
    let movieInfo = new DataStructures.MovieInfo();
    movieInfo.title = _.get(rawInfo, 'title', '');
    movieInfo.year = _.get(rawInfo, 'year', '');
    movieInfo.resolution = _.get(rawInfo, 'resolution', '');
    movieInfo.quality = _.get(rawInfo, 'quality', '');
    if (_.isEmpty(movieInfo.title) || _.isEmpty(movieInfo.year)) {
      throw new Error('Movie info parsing failed');
    }

    return movieInfo;
  }
}

export default MovieInfoExtractor;

