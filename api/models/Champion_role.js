/**
 * Champion role model 
 *
 *
 */

module.exports = {
	schema: true,

	attributes: {
		role: {
			type: 'string',
			required: true
		},

		has: {
			collection: 'Submission',
			via: 'champ_role'
		}
	}
}
