


module.exports = {
    schema: true,
    attributes: {
        state: {
            type: 'string',
            required: true
        },

        has: {
            collection: 'Submission',
            via: 'sub_type'
        }
    }
};
