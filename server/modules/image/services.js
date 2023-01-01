const repository = require('./repository');
const util = require('util');
const exec = util.promisify(require('node:child_process').exec);
const execFile = util.promisify(require('node:child_process').execFile);
const fs = require('fs').promises;


module.exports.submitImage = async (image) => {
	const processId = await repository.createImageProcess(image.filename);
	return processId;
};

module.exports.getImageProcessingOptions = async () => {
	const imageProcessingOptions = await repository.getImageProcessingOptions();
	return imageProcessingOptions;
};

module.exports.submitImageProcessingOptions = async (processId, processingOption, processingValue) => {
	const { image_name } = await repository.getProcess(processId);

	const command = `gcc *.c */*.c -o ../imageProcessing 
		-D originalFilename="${image_name}"
	 	-D processingOption="${processingOption}"
	  	-D processingValue="${processingValue ? processingValue : 'NONE'}"`
		.split('\n').join(' ').replace(/\s+/g, ' ');

	exec(command, {cwd: 'src'})
		.then(() => {
			execFile('imageProcessing.exe')
				.then(async () => {
					fs.readFile('processed-'+image_name)
						.then((data) => {
							return Buffer.from(data); // return the processed image
						})
						.catch((err) => {
							console.log('Error reading processed image: ', err);
						});
				}
				);
		})
		.catch((err) => {
			console.log('Error in processing an image: ', err);
		});
};