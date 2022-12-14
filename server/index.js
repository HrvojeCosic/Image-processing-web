const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});


/**
 * Middleware
 * 
 */
const corsOptions = {
	origin: 'http://127.0.0.1:5173',
};
app.use(cors(corsOptions));


/**
 * Routers
 * 
 */
const multer = require('multer');
const imageUpload = multer({
	limits: { fileSize: '2MB' },
	fileFilter: (req, file, cb) => {
		if (file.mimetype.includes('image/')) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only images are a valid upload.'));
		}
	}
});

const imageRouter = require('./modules/routes/image/index');
app.use('/image', imageUpload.single('file'), imageRouter);
