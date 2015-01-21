/**
 *
 *
 *
 */

module.exports = {
    schema: true,

    attributes: {
        date: {
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