/**
 * Champion model 
 *
 * 
 */

module.exports = {
	schema: true,
	connection: 'mysqlServer',
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
