/**
 * Comment
 *
 * @module      :: Model
 * @description :: comment 
 */

 module.exports = {

    schema:true,

    attributes: {

        written_by: {
            model: 'User',
            required: true
        },
        
        written_to: {
            model: 'Submission',
            required: true
        },

        //this field is not null if reply
        //otherwise null
        parentId: {
            model: 'Comment',
            defaultsTo: 0
        },

        text: {
            type: 'text',
            required: true
        },
        /*
        media: {
            model: 'Media'
        }
        */
    },

    beforeCreate: function(values, next){
        //check user
        User.findOne({id:values.written_by}).exec(function(err,user){
            if(err)
                return next(err);
            if(!user)
                return next("User not found");
            //check submission
            Submission.findOne({id:values.written_to}).exec(function(err,sub){
                if(err)
                    return next(err);
                if(!sub)
                    return next("Submission not found");

                next();
            });
        });
    }
};