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
    }
};