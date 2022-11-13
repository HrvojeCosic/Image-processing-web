const imageProcessingOptions = ['binary', 'grayscale', 'blur', 'edge', 'sort', 'resize', 'flip', 'rotate'];
const supportedImageFormats = ['jpg', 'jpeg', 'png', 'bmp'];

imageProcessingOptions.forEach((option) => {
	document.getElementById('image-processing-options').innerHTML += `<p class="option-element">${option}</p>`;
});

const imageInputElement = document.getElementById('image-input');
const handleImageInput = (inputValue) => {
	const inputtedFiles = Array.from(inputValue.target.files);
	const validInputs = validateImageInputs(inputtedFiles);
	updateUIWithInputtedFiles(validInputs);
};
imageInputElement.addEventListener('change', handleImageInput);

const validateImageInputs = (inputtedFiles) => {
	const validInputs = inputtedFiles;
	for (let i=validInputs.length-1; i>=0; i--) {
		const inputtedFileType = validInputs[i].type.split('/')[1];
		if (!supportedImageFormats.includes(inputtedFileType)) {
			alert(`Datoteka "${validInputs[i].name}" je tipa koji nije podrzan.\nPodrzani tipovi su: ${supportedImageFormats.join(', ')}`);
			validInputs.splice(i, 1);
			continue;
		}
	}
	return validInputs;
};

const updateUIWithInputtedFiles = (inputtedFiles) => {
	const fileNames = inputtedFiles.map(file => `<p>${file.name}</p>`).join('');
	document.getElementById('selected-file-titles').innerHTML += fileNames;
	if (fileNames.length) {
		document.getElementById('image-input-confirmation').style = 'display: block';
	}
};