/**
 * Champion role model 
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
			via: 'champ_role'
		}
	}
};
