/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

	attributes: require('waterlock').models.user.attributes({
    
		display_name: {
			type: 'string',
			unique: true,
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
		},

		follower: {
			collection: 'User_follower',
			via: 'follower'
		},

		following: {
			collection: 'User_follower',
			via: 'following'
		},

		comments: {
			collection: 'Comment',
			via: 'written_by'
		}
    
  	}),
  
  	beforeCreate: require('waterlock').models.user.beforeCreate,
  	beforeUpdate: require('waterlock').models.user.beforeUpdate
};
