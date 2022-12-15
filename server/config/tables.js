const db = require('./database')

module.exports.createMissingTables = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS public.image_process (
        process_id SERIAL PRIMARY KEY,
        image_name VARCHAR(255)
    );
`)
}