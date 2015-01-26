/**
 * Champion 
 *
 * @module      :: Model
 * @description :: Describe a Champion. 
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
			via: 'champ_type'
		}
	}
};
