/**
 * View counter for daily visiter
 *
 *
 */

module.exports = {
    schema:true,
    connection: 'mysqlServer',
    attributes: {
        submission_id: {
            model: 'Submission',
            required: true
        }
    }
};