/**
 *
 *
 *
 */

module.exports = {
	schema: true,
    connection: 'mysqlServer',
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
