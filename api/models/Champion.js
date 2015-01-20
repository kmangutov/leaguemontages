/**
 * Champion model 
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
		
		// collection of submissions that related to a champ
		has: {
			collection: 'Submission',
			via: 'champ_type'
		}
	}
};
