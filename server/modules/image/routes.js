var express = require('express');
var router = express.Router();
const imageUpload = require('../../config/imageUpload')

const ImageControllers = require('./controllers');

router.post('/', imageUpload.single('file'), ImageControllers.submitImage);


module.exports = router;
