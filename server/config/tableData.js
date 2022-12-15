const db = require('./database')

module.exports.createDefaultTableData = async () => {
    await db.query(`
        INSERT INTO public.image_processing_option (name, parameters)
        VALUES
        ('binary', ARRAY['']),
        ('grayscale', ARRAY['']),
        ('blur', ARRAY['blur radius']),
        ('flip', ARRAY['plane direction']),
        ('rotate', ARRAY['direction']),
        ('pixel sort', ARRAY[''])
        ON CONFLICT DO NOTHING
    `)
}