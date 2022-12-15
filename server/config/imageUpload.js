var fs = require('fs');

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
		destination: async (req, file, cb) => {
			const dirPath = './uploadedImages/';

			fs.mkdir(dirPath, {recursive: true}, (err) => {
				if (err) {
					cb(err, dirPath);
				}
			});

			cb(null, dirPath);
		},
		filename: (req, file, cb) => {
			let ext = '';
			if (file.originalname.split('.').length > 1){
				ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
			}
			cb(null, `${file.originalname.substring(0, file.originalname.lastIndexOf('.'))} - ${Date.now()}${ext}`);
		}
	})

});

module.exports = imageUpload;