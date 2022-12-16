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

	console.log('TEST',processingOption, processingValue, process_id, image_name);
	const command = `gcc *.c */*.c -o ../imageProcessing 
		-D originalFilename="${image_name}"
	 	-D processingOption="${processingOption}"
	  	-D processingValue="${processingValue ? processingValue : 'NONE'}"`
		.split('\n').join(' ').replace(/\s+/g, ' ');

	exec(command,
		{cwd: 'src'},
		(error) => {
			if (error) {
				console.log(cwd());
				return console.error(`compile error: ${error}`);
			}

			execFile('imageProcessing.exe',
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