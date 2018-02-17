let express = require('express');
let router = express.Router();

let files = require('./files');

router.use('/explorer', files);
module.exports = router;
