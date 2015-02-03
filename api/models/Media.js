/**
 * Media
 *
 * @module      :: Model
 * @description :: Describe a media
 */

module.exports = {
    schema: true,
    attributes: {
        
        media_type: {
            model: 'MediaType'
        },

        media_url: {
            type: 'string',
            required: true
        },

        hash: {
            type: 'string'
        }
    }
};
