/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
    
	/*name: {
		type: 'string',
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
	},*/

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
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
