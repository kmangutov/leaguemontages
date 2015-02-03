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
	},

	beforeCreate: function(values, next){

		//check follower id exist and follwing id is in its list
		User.findOne({id:values.follower})
			.populate('following')
			.exec(function(err, usr){

			if(err)
				return next(err);
			if(!usr)
				return next({err:404, msg:'User id ' + values.follower + ' not exist'});
		});

		//check following id exist
		User.findOne({id:values.following}).exec(function(err, usr){
			if(err)
				return next(err);
			if(!usr)
				return next({err:404, msg:'User id ' + values.follower + ' not exist'});
		});

		User_follower.findOne({follower:values.follower, following:values.following})
			.exec(function(err,userfollow){

			if(err)
				return next(err);
			if(userfollow)
				return next({err:401, msg:'user ' + values.follower + ' is already following ' + values.following});
		});
			
		next();
	}
};
