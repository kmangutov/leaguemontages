/**
 * Rating model
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		value: {
			type: 'int',
			required: true
		},

		given_to: {
			model: 'Submission',
			required: true
		},

		from: {
			model: 'User',
			required: true
		}
	}		
};
