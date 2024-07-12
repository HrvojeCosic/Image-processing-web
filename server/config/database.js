const { Client } = require('pg');

const db = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'image_processing_web_db',
	password: '123',
	port: 5432,
});


db.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err.stack);
	} else {
		console.log('Connected to the database.');
	}
});


module.exports = db;
