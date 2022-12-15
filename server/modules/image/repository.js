const db = require('../../config/database');

module.exports.createImageProcess = async (imageFilename) => {
        const { rows: {0: { process_id }} } = await db.query(`
                INSERT INTO public.image_process
                (image_name) VALUES ($1)
                RETURNING process_id;
        `, [imageFilename])

        return process_id;
}

module.exports.getImageProcessingOptions = async () => {
        const { rows } = await db.query(`
                SELECT * FROM public.image_processing_option;
        `)
        return rows;
}