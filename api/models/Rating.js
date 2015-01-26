/**
 * Rating
 *
 * @module      :: Model
 * @description :: Prepresentation of Rating. It has attributes[from,given_to] to indicate giver/receiver
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
