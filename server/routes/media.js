let express = require('express');
let fs = require('fs');

let router = express.Router();
const statusCodes = require('http-status-codes');
let fileExplorer = require('../controllers').fileExplorer;
let mediaProcessor = require('../controllers').media;

/**
 * Streams a video file(.mp4).
 */
router.get('/stream', (req, res) => {
  let filePath = req.query.path;
  fs.stat(req.query.path, (err, stats) => {
    if (err) {
      if (err.code == 'ENOENT') {
        return res.status(statusCodes.NOT_FOUND).json({message: 'File not found at path: ' + filePath});
      }
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
    let range = req.headers.range;
    if (!range) {
      return res.status(statusCodes.REQUESTED_RANGE_NOT_SATISFIABLE).json({message: 'Range not found'});
    }
    let positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);
    let fileSize = stats.size;
    let end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;

    let chunkSize = (end - start) + 1;
    let mimeType = fileExplorer.getMimeType(filePath);
    if (!mimeType) {
      return res.status(statusCodes.BAD_REQUEST).json({message: 'Unsupported video format'});
    }

    let headers  = {
      'Content-Range': 'bytes ' + start + ' - ' + end + '/' + fileSize,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType
    };

    res.writeHead(statusCodes.PARTIAL_CONTENT, headers);

    let stream = fs.createReadStream(filePath, {start: start, end: end});
    stream.on('open', () => {
      stream.pipe(res);
    });

    stream.on('error', (err) => {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    });
  });
});


router.get('/info', (req, res) => {
  if (!req.query.title) {
    return res.status(statusCodes.BAD_REQUEST).json({message: 'Movie title must be provided'});
  }

  mediaProcessor.getMovieInfoFromTitleAndYear(req.query.title, req.query.year, (err, movie) => {
    if (err) {
      return res.status(statusCodes.NOT_FOUND).json({message: err.message});
    }

    res.status(statusCodes.OK).json(movie);
  });
});

module.exports = router;
