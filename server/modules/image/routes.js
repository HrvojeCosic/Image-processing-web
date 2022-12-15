var express = require('express');
var router = express.Router();

const ImageControllers = require('./controllers');

router.post('/', ImageControllers.submitImage);


module.exports = router;
