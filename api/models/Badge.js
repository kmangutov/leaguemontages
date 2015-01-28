/**
 * Badge
 *
 * @module      :: Model
 * @description :: Describe a badge
 */

module.exports = {
	schema: true,
	attributes: {
		badge_type: {
			model: 'Badge_type',
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
	},

	beforeCreate: function(values, next){
		Badge.findOne({from:values.user, given_to:values.given_to})
			.exec(function(err, badge){

			if(err)
				return next(err);
			if(badge)
				return next('Badge is already given to ' + values.given_to + ' by ' + values.from);

			Badge_type.findOne({id:values.badge_type}).exec(function(err,type){
				if(!type)
					return next('Badge type is unknonw');
			})
			
			next();
		});
	}
};
