/**
 * User follower
 *
 * @module      :: Model
 * @description :: Describe a follower/following relation of user
 */

module.exports = {
	schema: true,
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
