/**
 * Media ype
 *
 * @module      :: Model
 * @description :: Describe a type of media
 */

module.exports = {
    
    schema: true,
    
    attributes: {
        
        format: {
            type: 'string',
            required: true
        },

        type: {
            type: 'string',
            required: true
        },

        has: {
            collection: 'Media',
            via: 'media_type'
        }
    }
};
