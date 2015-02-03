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

		description: {
			type: 'text'
		},
		
		createdBy: {
			model: 'User',
		},
		
		champ_type: {
			model: 'Champion',
			required: true
		},

		champ_role: {
			model: 'Champion_role'
		},	

		sub_type: {
			model: 'Submission_type',
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
			via: 'has',
			dominant: true
		},

		comments: {
			collection: 'Comment',
			via: 'written_by'
		},
		
		state: {
			model: 'SubmissionState',
		},

		incrementView:function(){
			this.view = this.view + 1;
			this.save();
		}
	}
};
