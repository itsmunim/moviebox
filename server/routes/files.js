let express = require('express');
let router = express.Router();
let controllers = require('../controllers');

/**
 * Returns files and folders inside a given folder path or home directory as default.
 */
router.get('/files', function (req, res) {
  controllers.files.getAll(req.query.path)
    .then((files) => {
      return res.json(files);
    })
    .catch((err) => {
      return res.send(500).json({message: err.message});
    });
});


module.exports = router;
