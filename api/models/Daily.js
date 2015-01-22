/**
 * Daily viewer counter
 *
 *
 */

 module.exports = {
    schema: true,
    connection: 'mysqlServer',
    attributes: {
        date: {
            type: 'datetime',
            required: true
        },

        count: {
            type: 'integer',
            required: true
        },

        on: {
            model: 'Submission'
        }
    }

 }