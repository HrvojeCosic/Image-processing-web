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
	origin: 'http://127.0.0.1:5173',
};
app.use(cors(corsOptions));


/**
 * Routers
 * 
 */
const imageRouter = require('./modules/image/routes');
app.use('/image', imageRouter);
tables.createMissingTables()
