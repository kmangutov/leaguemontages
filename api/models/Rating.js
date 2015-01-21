/**
 * Rating model
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		value: {
			type: 'integer',
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
