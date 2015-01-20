/**
 *
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		badge_type: {
			model: 'Badge_type'
		},

		// 
		from: {
			model: 'User'
		},

		to: {
			model: 'Submission'
		},

		given_date: {
			type: 'datetime'
		}
	}

}
