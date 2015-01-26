/**
 * Badge type
 *
 * @module      :: Model
 * @description :: Describe a badge type.
 */

module.exports = {
	schema: true,
	attributes: {
        name: {
            type: 'string',
            required: true
        },
        
		badges: {
			collection: 'Badge',
			via: 'badge_type'
		}
	}
};
