const db = require('./database')

module.exports.createMissingTables = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS public.image_process (
        process_id INT,
        image_name VARCHAR(255)
    );
`)
}