/**
 * User model 
 *
 * created by intoxicated 1/20/15
 *
 */

module.exports = {
	schema:true,

	attributes: {
		nickname: {
			tyep: 'string',
			unique: true,
			required: true
		},

		email: {
			type: 'string',
			unique: true,
			required: true
		},

		password: {
			type: 'string',
			required: true
		},

		user_type: {
			model: 'User_type'
		},

		submissions: {
			collection: 'Submission',
			via: 'createdBy'
		},

		ratings: {
			collection: 'Rating',
			via: 'from'
		},

		badges: {
			collection: 'Badge',
			via: 'from'
		}
		// any instance method goes here
	}

	// any model method goes here 
};
