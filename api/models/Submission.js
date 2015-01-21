/**
 * Submission model
 *
 *
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
		
		view: {
			type: 'integer',
			defaultTo: 0
		},
		
		state: {
			type: 'string',
			enum: ['approved', 'pending', 'rejected'],
			required: true
		}
	}
};
