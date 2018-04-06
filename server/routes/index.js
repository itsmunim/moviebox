let express = require('express');
let router = express.Router();
let routes = require('../common').loadModule('routes');

router.use('/explorer', routes.files);
router.use('/media', routes.media);
module.exports = router;
