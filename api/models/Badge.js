/**
 * Badge model
 *
 *
 */

module.exports = {
	schema: true,
	connection: 'mysqlServer',
	attributes: {
		badge_type: {
			model: 'Badge_type',
			required: true
		},

		from: {
			model: 'User',
			required: true
		},

		given_to: {
			model: 'Submission',
			required: true
		}
	}
};
