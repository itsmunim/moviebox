let express = require('express');
let router = express.Router();
let controllers = require('../controllers');
const statusCodes = require('http-status-codes');

/**
 * Returns files and folders inside a given folder path or home directory as default.
 */
router.get('/files', function (req, res) {
  controllers.files.getAll(req.query.path)
    .then((files) => {
      return res.status(statusCodes.OK).json(files);
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    });
});


module.exports = router;
