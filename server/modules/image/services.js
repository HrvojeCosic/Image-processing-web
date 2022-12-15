const repository = require('./repository');

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
	console.log(image_name, processingOption, processingValue, process_id);

};