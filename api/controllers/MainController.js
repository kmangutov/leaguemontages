

module.exports = {

    //temporary here, logic to read viewcounter table and count for submission,
    //create daily model for each submission with counts
    //remove all rows from view counter
    
    getCount: function (req, res) {

        ViewCounter.query('SELECT distinct(submission_id), count(id) as count from ViewCounter group by submission_id',
            function(err, views){
        
            if(err)
                return res.send(500, {error:"internal error"});
            if(!views)
                return res.send(400, {error:"view not found"});

            //get list of count and submission id
            //create daily based on this
            var date = Date();
            var success = true;

            views.forEach(function(subs){ 
                Daily.create({date:Date(), count:subs.count, on:subs.submission_id})
                    .exec(function(err, daily){
                    if(err) {
                        success = false;
                        sails.log('Error while creating daily count for ' + subs.submission_id);
                    }
                });
                sails.log(date + " -- " + subs.submission_id + " " + subs.count);
            });

            if(success){
                ViewCounter.query('TRUNCATE TABLE ViewCounter', function(err, empty){
                    if(err)
                        sails.log('Error on emptying view counter');
                });
            }

            return res.send(200, {data: views});
        });
    }
}