/**
 * View counter for daily visiter
 *
 *
 */

module.exports = {
    schema:true,
    attributes: {
        submission_id: {
            model: 'Submission',
            required: true
        }
    },

    //prevent to create viewcounter where subid does not exist
    beforeCreate: function(values, next){
        Submission.findOne({id:values.submission_id}).exec(function(err, sub){
            if(err)
                return next(err);
            if(!sub)
                return next("submission id " + values.submission_id + " not exist");
            next();
        })
    }
};