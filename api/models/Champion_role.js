/**
 * Champion role
 *
 * @module      :: Model
 * @description :: Describe a champion role. 
 * @name        :: Mid, Support, jungle, ADC, Top 
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
