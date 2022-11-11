const imageProcessingOptions = ['binary', 'grayscale', 'blur', 'edge', 'sort', 'resize', 'flip', 'rotate'];

imageProcessingOptions.forEach((option) => {
	document.getElementById('image-processing-options').innerHTML += `<p class="option-element">${option}</p>`;
});

