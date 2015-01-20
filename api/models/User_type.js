/**
 * User_type model 
 *
 *
 *
 */ 

module.exports = {
	schema: true,

	attributes: {
		//admin, approver, and other user level
		utype: {
			type: 'string',
			unique: true,
			required: true
		},

		users: {
			collection: 'User',
			via: 'user_type'
		}
	}
};
