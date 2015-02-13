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
			model: 'BadgeType',
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
		Badge.findOne({from:values.from, given_to:values.given_to, badge_type: values.badge_type})
			.exec(function(err, badge){

			if(err)
				return next(err);
			if(badge)
				return next('Badge is already given to ' + values.given_to + ' by ' + values.from);

			BadgeType.findOne({id:values.badge_type}).exec(function(err,type){
				if(!type)
					return next('Badge type is unknonw');
				next();
			})
		});
	}
};
