var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	res.send('aa').status(200);
});

module.exports = router;
