const fs = require('fs');
const imageServices = require('./services');


module.exports.submitImage = async (req, res) => {
	const processId = await imageServices.submitImage(req.file)
	const imageProcessingOptions = await imageServices.getImageProcessingOptions();
	
	res.status(200).send({
		processId, imageProcessingOptions
	})



	// // console.log(req.file);
	// // try {
	// // if (!cwd().includes(pathToLib)) {
	// // 	chdir(pathToLib);
	// // }
	// // Compile the C code 

	// exec('gcc *.c -o imageProcessing', (error) => {
	// 	if (error) {
	// 		console.error(`compile error: ${error}`);
	// 		return;
	// 	}

	// 	// Execute the compiled program
	// 	exec('imageProcessing.exe', (error, stdout) => {
	// 		if (error) {
	// 			console.error(`compiled program exec error: ${error}`);
	// 			return;
	// 		}

	// 		// 	// Print the output of the program
	// 		console.log(stdout);
	// 	});
	// });
	// // } catch (err) {
	// // 	console.error(`chdir error: ${err}`);
	// // }

};