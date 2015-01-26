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

        count: {
            type: 'integer',
            required: true
        },

        subid: {
            model: 'Submission'
        }
    }

 } 