/**
 * User model 
 *
 * created by intoxicated 1/20/15
 *
 */
var bcrypt = require('bcrypt');

module.exports = {
	schema:true,
	connection: 'mysqlServer',
	attributes: {
		name: {
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
		// any instance method goes here
	},
	// any model method goes here 
	beforeCreate: function(values, next) {
		bcrypt.genSalt(10, function(err, salt){
			if(err) return next(err);

			bcrypt.hash(values.password, salt, function(err,hash){
				if(err) return next(err);

				values.password = hash;
				next();
			});
		});
	},

	validPassword: function(user, password, cb) {
		bcrypt.compare(password, user.password, function(err, match){
			if(err) cb(err);
			
			if(match)
				cb(null, true);
			else
				cb(null, false);
		})
	}
};
