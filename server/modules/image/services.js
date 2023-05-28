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
	  	-D processingValue="${processingValue ? processingValue : 'NONE'}"
		-lm`
		.split('\n').join(' ').replace(/\s+/g, ' ');

	try {
		await exec(command, {cwd: 'src'});
		await execFile('./imageProcessing');
		return await fs.readFile('processed-' + image_name);
	} catch (err) {
		console.log('Image processing error: ', err);
	}
};