const repository = require('./repository');
var { exec } = require('node:child_process');
const { cwd } = require('process');
const { execFile } = require('child_process');


module.exports.submitImage = async (image) => {
	const processId = await repository.createImageProcess(image.filename);
	return processId;
};

module.exports.getImageProcessingOptions = async () => {
	const imageProcessingOptions = await repository.getImageProcessingOptions();
	return imageProcessingOptions;
};

module.exports.submitImageProcessingOptions = async (
	processId, processingOption, processingValue) => {
	const { process_id, image_name } = await repository.getProcess(processId);

	console.log(processingOption, processingValue, process_id, image_name);
	const imagePath = '../uploadedImages';

	exec(`gcc *.c */*.c -o imageProcessing -D imagepath="${imagePath}"`,
		{cwd: 'src'},
		(error) => {
			if (error) {
				console.log(cwd());
				return console.error(`compile error: ${error}`);
			}

			execFile('imageProcessing.exe',
				{cwd: 'src'},
				(error, stdout, stderr) => {
					if (error) {
						return console.error(`exec error: ${error}`);
					}
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
				}
			);
		});
};