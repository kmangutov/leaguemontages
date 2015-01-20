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

		desc: {
			type: 'text'
		},
		
		createdBy: {
			model: 'User',
			required: true
		},

		createdAt: {
			type: 'datetime',
			required: true
		},

		champ: {
			model: 'Champion',
			required: true
		},

		champ_role: {
			model: 'Champion_role'
		},

		sub_type: {
			model: 'Submission_type',
			required: true
		},
		
		ratings: {
			collection: 'Rating',
			via: 'given_to'
		},
		
		badges: {
			collection: 'Badge',
			via: 'given_to'
		},

		state: {
			type: 'string',
			enum: ['approved', 'pending', 'rejected'],
			required: true
		}
	}
}
