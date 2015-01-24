/**
 * Weekly 
 *
 *
 */

module.exports = {
    schema: true,
    connection: 'mysqlServer',
    attributes: {
        startDate: {
            type: 'datetime',
            required: true
        },

        endDate: {
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