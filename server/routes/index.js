let express = require('express');
let router = express.Router();

let files = require('./files');
let media = require('./media');

router.use('/explorer', files);
router.use('/media', media);
module.exports = router;
