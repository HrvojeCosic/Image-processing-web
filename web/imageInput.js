const imageProcessingOptions = ['binary', 'grayscale', 'blur', 'edge', 'sort', 'resize', 'flip', 'rotate'];
const supportedImageFormats = ['jpg', 'jpeg', 'png', 'bmp'];

imageProcessingOptions.forEach((option) => {
	document.getElementById('image-processing-options').innerHTML += `<p class="option-element">${option}</p>`;
});

const imageInputElement = document.getElementById('image-input');
const handleImageInput = (inputValue) => {
	const inputtedFiles = inputValue.target.files;
	for (let i=0; i<inputtedFiles.length; i++) {
		const inputtedFileType = inputtedFiles[i].type.split('/')[1];
		if (!supportedImageFormats.includes(inputtedFileType)) {
			alert(`Datoteka "${inputtedFiles[i].name}" je tipa koji nije podrzan.\nPodrzani tipovi su: ${supportedImageFormats.join(', ')}`);
		}
	}
};
imageInputElement.addEventListener('change', handleImageInput);
 