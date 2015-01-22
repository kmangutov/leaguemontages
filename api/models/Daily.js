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

        counter: {
            type: 'integer',
            required: true
        },

        on: {
            model: 'Submission'
        }
    }

 }