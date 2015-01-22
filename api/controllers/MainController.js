

module.exports = {
    getCount: function (req, res) {
        var temp;

        //ViewCounter.query('SELECT distinct(submission_id), count(id) from ViewCounter group by submission_id',
        //    function(err, views){
        ViewCounter.find().exec(function(err, views){
            if(err)
                return res.send(500, {error:"internal error"});
            if(!views)
                return res.send(400, {error:"view not found"});

            return res.send(200, {data:views});
        });
    }
}