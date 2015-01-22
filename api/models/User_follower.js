/**
 * User_follower model 
 *
 *
 */

module.exports = {
	schema: true,
	connection: 'mysqlServer',
	attributes: {
		follower: {
			model: 'User',
			required: true
		},
		
		following: {
			model: 'User',
			required: true
		}	
	}
};
