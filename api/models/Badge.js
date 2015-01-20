/**
 *
 *
 *
 */

module.exports = {
	schema: true,

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
		},

		given_date: {
			type: 'datetime'
		}
	}

}
