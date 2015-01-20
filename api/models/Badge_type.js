/**
 *
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		badges: {
			collection: 'Badge',
			via: 'badge_type'
		}
	}
};
