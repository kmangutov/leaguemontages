/**
 * Weekly 
 *
 *
 */

module.exports = {
    schema: true,

    attributes: {
        startDate: {
            type: 'datetime',
            required: true
        },

        endDate: {
            type: 'datetime',
            required: true
        },

        counter: {
            type: 'integer',
            required: true
        },

        on: {
            model: 'Submission'
        }
    }

 } 