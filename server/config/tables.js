const db = require('./database');

module.exports.createMissingTables = async () => {
	await db.query(`
    CREATE TABLE IF NOT EXISTS public.image_process (
        process_id SERIAL PRIMARY KEY,
        image_name VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS public.image_processing_option (
        name VARCHAR(32) PRIMARY KEY,
        parameters VARCHAR(32)[],
        possible_values VARCHAR(32)[]
    );
`);
};