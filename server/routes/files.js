let express = require('express');
let async = require('async');

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
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
      return;
    }

    async.map(filepaths, mediaProcessor.getMediaMetadata, (err, results) => {
      if (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        return;
      }
      return res.status(statusCodes.OK).json(results);
    });
  });
});

module.exports = router;
