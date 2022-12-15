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
	},
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploadedImages/')
        },
        filename: (req, file, cb) => {
            let ext = '';
            if (file.originalname.split('.').length > 1){
                ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
            }
            cb(null, `${file.originalname.substring(0, file.originalname.lastIndexOf('.'))} - ${Date.now()}.${ext}`)
        }
    })

});

const imageRouter = require('./modules/image/routes');
app.use('/image', imageUpload.single('file'), imageRouter);
