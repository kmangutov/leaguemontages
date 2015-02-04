/**
 * Tag
 *
 * @module      :: Model
 * @description :: Describe a general purpose tag 
 */
 module.exports = {
    schema: true,
    attributes: {
        name: {
            type: 'string',
            required: true
            //length limit
        },

        state: {
            type: 'string',
            enum: ['approved', 'pending', 'rejected'],
            defaultsTo: 'pending',
            required: true         
        },

        submissions: {
            collection: 'Submission',
            via: 'tags'
        },

        setState: function(state) {
            this.state = state;
            this.save();
        }
    },

    beforeCreate: function(values, next) {

        Tag.findOne({name:values.name}).exec(function(err, tag){
            if(err)
                return next(err);
            
            if(tag) //if there no tag exist
                return next('Cannot create same tag');

            next();
        });
    }

 };