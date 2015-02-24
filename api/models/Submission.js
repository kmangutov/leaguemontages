/**
 * Submission
 *
 * @module      :: Model
 * @description :: Describe a submission made by a user
 */
 
module.exports = {
	
	schema: true,
	
	attributes: {
		title: {
			type: 'string',
			required: true
		},

		url: {
			type: 'string',
			required: true
		},

		thumbnail_url: {
			type: 'string'
		},

		description: {
			type: 'text'
		},
		
		createdBy: {
			model: 'User'
		},
		
		champ_type: {
			model: 'Champion',
			required: true
		},

		champ_role: {
			model: 'ChampionRole'
		},	

		sub_type: {
			model: 'SubmissionType'
		},

		ratings: {
			collection: 'Rating',
			via: 'given_to'
		},
		
		badges: {
			collection: 'Badge',
			via: 'given_to'
		},
		
		//lifetime view counter
		view: {
			type: 'integer',
			defaultsTo: 0
		},

		//view counters
		daily: {
			collection: 'Daily',
			via: 'subid'
		},

		weekly: {
			collection: 'Weekly',
			via: 'subid'
		},

		monthly: {
			collection: 'Monthly',
			via: 'subid'
		},

		tags: {
			collection: 'Tag',
			via: 'submissions',
			dominant: true
		},

		comments: {
			collection: 'Comment',
			via: 'written_by'
		},
		
		state: {
			model: 'SubmissionState',
			defaultsTo: 1 //default to pending 
		}
	},

	//when view get updated, create viewcounter in order to 
	//avoid exposing viewcounter api to public 
	beforeUpdate: function(values, next){
		Submission.findOne({id:values.id}).exec(function(err,submission){
			if(err)
				next(err);
			if(!submission)
				next("Submission does not exist");
			if(submission.view + 1 == values.view) //updating view, hence create new viewcounter 
			{
				ViewCounter.create({submission_id:submission.id}).exec(function(verr, vc){
					if(verr)
						next(err);
				});
			}
			next();
		})
	}
};
