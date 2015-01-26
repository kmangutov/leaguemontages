/**
 * Tag model for general 
 *
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
            required: true
        },

        has: {
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
                next(err);
            
            if(!tag) //if there no tag exist
                values.state = 'pending';
            else // if exisit, automatically approved
                values.state = 'approved';

            next();
        });
    }

 };