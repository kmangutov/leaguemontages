/**
 * Submission type 
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		name: {
			type: 'string',
			required: true
		},

		has: {
			collection: 'Submission',
			via: 'sub_type'
		}
	}

}
