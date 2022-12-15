const repository = require('./repository')

module.exports.submitImage = async (image) => {
    const processId = await repository.createImageProcess(image.filename);
    return processId;
}