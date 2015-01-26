/**
 * Monthly 
 *
 * @module      :: Model
 * @description :: Describe a number of viewer for a submission on Weekly basis. 
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

        count: {
            type: 'integer',
            required: true
        },

        subid: {
            model: 'Submission'
        }
    }

 } 