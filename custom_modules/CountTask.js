var CronJob = require('cron').CronJob;

module.exports = {
    
    runDailyTask: function() {
        console.log("setting up cronjob...");
        var job = new CronJob({
            cronTime: '*/10 * * * * *',
            //cronTime: '00 15 00 * * *', //run it everyday at 04:00:00 AM
            onTick: function() {
                 var q = 'SELECT distinct(submission_id), count(id) as ' + 
                    'count from ViewCounter group by submission_id';
                 
                 ViewCounter.query(q, function(err, views){
        
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
                        Daily.create({date:Date(), count:subs.count, subid:subs.submission_id})
                            .exec(function(err, daily){
                            if(err) {
                                success = false;
                                console.log('Error while creating daily count for ' + subs.submission_id);
                                return;
                            }
                        });
                    });

                    //what about submission that doesn't have view today??? skip or insert with count 0? 

                    if(success){
                        ViewCounter.query('TRUNCATE TABLE ViewCounter', function(err, empty){
                            if(err)
                                console.log('Error on emptying view counter');
                        });
                    }//what to do if theres error?? possibility?
                    
                    console.log('Finished daily job');
                });
                
            },
            start: false,
            timeZone: "America/Los_Angeles"
            
        });

        job.start();
    },

    runWeeklyTask: function() {
        var job = new CronJob({
            cronTime: '*/10 * * * * *',
            //cronTime: '00 15 01 * * 0',
            onTick: function() {
                var days = 7;
                var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
                var date = new Date();
                date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
                date = date.toISOString().slice(0, 19).replace('T', ' ');
                
                var q = 'select distinct(subid), sum(count) from ' +
                    '(select subid, count from daily where ' +
                    'date between "' + date + '" and "' + today + '") as t group by subid';

                console.log(q);

                Daily.query(q, function(err, dailys){
                    if(err){
                        console.log('Database error while finding weekly data: ' + err);
                        return;
                    }

                    if(!dailys || dailys.length == 0){
                        console.log('Cannot find daily between ' + date + ' and ' + today);
                        return;
                    }

                    //sum of count and id 
                    Weekly.create({startDate:date, endDate:today, count: daily.count, subid:daily.subid})
                        .exec(function(err, weekly){
                        if(err)
                            console.log('Cannot create weekly model');
                    });
            
                });

            },
            start: false,
            timeZone: "America/Los_Angeles"
        });

        job.start();
    },

    runMonthlyTask: function() {
        var job = new CronJob({
            cronTime: '00 15 02 1 * *',
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