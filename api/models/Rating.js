/**
 * Rating
 *
 * @module      :: Model
 * @description :: Prepresentation of Rating. It has attributes[from,given_to] to indicate giver/receiver
 */

module.exports = {
	schema: true,
	attributes: {
		value: {
			type: 'integer',
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
		Rating.findOne({from:values.from, given_to:values.given_to})
			.exec(function(err, rating){
			if(err)
				return next(err);
			if(rating)
				return next('Rating to ' + values.given_to + ' by user ' + values.from + ' exists');
			if(values.value < 0 || values.value > 5)
				return next('Rating range is not valid');
			
			next();
		});
	}	
};
