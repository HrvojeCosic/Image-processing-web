const express = require('express');
const cors = require('cors');
const db = require('./config/database')
const tables = require('./config/tables')
const app = express();
const port = 4000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});


/**
 * Middleware
 * 
 */
const corsOptions = {
	origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
	console.log("ERROR: " + err);
	res.status(500).send({message: "Something went wrong while processing the request."})
})


/**
 * Routers
 * 
 */
const imageRouter = require('./modules/image/routes');
app.use('/image', imageRouter);
tables.createMissingTables()
