var express = require('express');
var router = express.Router();
const imageUpload = require('../../config/imageUpload');
const use = require('../../config/errorCatcher');

const ImageControllers = require('./controllers');


router.post('/', imageUpload.single('file'), use(ImageControllers.submitImage));
router.post('/processingOptions', use(ImageControllers.submitImageProcessingOptions));


module.exports = router;
