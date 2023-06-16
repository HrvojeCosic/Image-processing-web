const repository = require('./repository');
const util = require('util');
const exec = util.promisify(require('node:child_process').exec);
const fs = require('fs').promises;


module.exports.submitImage = async (image) => {	
	const filename = image.filename.replace(/ /g,'');
	const processId = await repository.createImageProcess(filename); // C args don't like whitespaces

	const tempDir = `${process.env.PWD}/temp`;
	await fs.rename(`${process.env.PWD}/${filename}`, `${tempDir}/${filename}`);

	return processId;
};

module.exports.getImageProcessingOptions = async () => {
	const imageProcessingOptions = await repository.getImageProcessingOptions();
	return imageProcessingOptions;
};

module.exports.submitImageProcessingOptions = async (processId, processingOption, processingValue) => {
	const { image_name } = await repository.getProcess(processId);
	const tempDir = `${process.env.PWD}/temp`;
	const command = `make run OG_FNAME="${image_name}" PROC_OPT="${processingOption}" PROC_VAL="${processingValue}"`

	try {
		await exec(command, {cwd: 'temp'});
		return await fs.readFile(`${tempDir}/processed-` + image_name);
	} catch (err) {
		console.error('Image processing error: ', err);
	}
};