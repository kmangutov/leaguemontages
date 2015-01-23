var CronJob = require('cron').CronJob;

module.exports = {
    
    runDailyTask: function() {
        console.log("setting up cronjob...");
        var job = new CronJob({
            cronTime: '00 05 00 * * *', //run it everyday at 00:10:00 AM
            onTick: function() {
                 
                 ViewCounter.query('SELECT distinct(submission_id), count(id) as count 
                    from ViewCounter group by submission_id', function(err, views){
        
                    if(err){
                        console.log('Error on access view counter');
                        return;
                    }

                    if(!views || views.length == 0){
                        console.log('ViewCounter is empty');
                        return;
                    }

                    //get list of count and submission id
                    //create daily based on this
                    var date = Date();
                    var success = true;

                    views.forEach(function(subs){ 
                        Daily.create({date:Date(), count:subs.count, on:subs.submission_id})
                            .exec(function(err, daily){
                            if(err) {
                                success = false;
                                console.log('Error while creating daily count for ' + subs.submission_id);
                                return;
                            }
                        });
                        sails.log(date + " -- " + subs.submission_id + " " + subs.count);
                    });

                    if(success){
                        ViewCounter.query('TRUNCATE TABLE ViewCounter', function(err, empty){
                            if(err)
                                console.log('Error on emptying view counter');
                        });
                    }//what to do if theres error?? possibility?
                    
                    console.log('Finished clearing job ' + views);
                });
                
            },
            start: false,
            timeZone: "America/Los_Angeles"
            
        });

        job.start();
    },

    runWeeklyTask: function() {
        var job = new CronJob({
            cronTime: '00 00 00 * * 0',
            onTick: function() {
                //get current date
                //get last 7 days dailys indexes 
                //count and insert new record in weekly 
            },
            start: false,
            timeZone: "America/Los_Angeles"
        });

        job.start();
    },

    runMonthlyTask: function() {
        var job = new CronJob({
            cronTime: '00 00 00 1 * *',
            onTick: function() {
                //get current date
                //get last 4 weekly indexes
                //count and insert new record in monthly
            },
            start: false,
            timeZone: "America/Los_Angeles"
        });

        job.start();
    }
};