const express = require('express');
const cors = require('cors');
const tables = require('./config/tables');
const tableData = require('./config/tableData');
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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.log('ERROR: ' + err);
	res.status(500).send({message: 'Something went wrong while processing the request.'});
});

app.use(express.json());


/**
 * Routers
 * 
 */
const imageRouter = require('./modules/image/routes');
app.use('/image', imageRouter);
tables.createMissingTables();
tableData.createDefaultTableData();
