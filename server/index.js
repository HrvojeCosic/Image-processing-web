const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
}); 

/**
 * Routers
 * 
 */
const imageRouter = require('./modules/routes/image/index');
app.use('/image', imageRouter);
