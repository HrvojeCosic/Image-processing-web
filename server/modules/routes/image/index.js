var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	console.log(req.file);
	res.send('aa').status(200);
});


module.exports = router;
