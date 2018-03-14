let express = require('express');
let async = require('async');
let fs = require('fs');

let router = express.Router();
const statusCodes = require('http-status-codes');
let fileExplorer = require('../fs-explorer');
let mediaProcessor = require('../media');

/**
 * Returns files and folders inside a given folder path or home directory as default.
 */
router.get('/files', function (req, res) {
  fileExplorer.list(req.query.path)
    .then((files) => {
      return res.status(statusCodes.OK).json(files);
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    });
});


router.get('/media-files', (req, res) => {
  fileExplorer.scanForMedia(req.query.path, (err, filepaths) => {
    if (err) {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    }

    async.map(filepaths, mediaProcessor.getMediaMetadata, (err, results) => {
      if (err) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
      }
      return res.status(statusCodes.OK).json(results);
    });
  });
});

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
      return res.status(400).json({message: 'Unsupported video format'});
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

module.exports = router;
