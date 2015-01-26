/**
 * Daily
 *
 * @module      :: Model
 * @description :: Describe a number of viewer for a submission on daily basis.
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