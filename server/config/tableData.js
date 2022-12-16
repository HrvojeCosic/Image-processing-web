const db = require('./database');

module.exports.createDefaultTableData = async () => {
	await db.query(`
        INSERT INTO public.image_processing_option (name, parameters, possible_values)
        VALUES
        ('binary', ARRAY[''], ARRAY['']),
        ('grayscale', ARRAY[''], ARRAY['']),
        ('blur', ARRAY['blur radius'], ARRAY['number']),
        ('flip', ARRAY['plane direction'], ARRAY['horizontal', 'vertical']),
        ('rotate', ARRAY['direction'], ARRAY['left', 'right']),
        ('pixel sort', ARRAY[''], ARRAY[''])
        ON CONFLICT DO NOTHING
    `);
};