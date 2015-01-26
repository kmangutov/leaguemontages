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

                    //initially all submission get 0 count for the day
                    Submission.find().exec(function(err, submissions){
                        submissions.forEach(function(sub){
                            Daily.create({date:date, count:0, subid:sub.id})
                                .exec(function(err, daily){
                                if(err) {
                                    success = false;
                                    console.log('Error while creating daily count for ' + subs.submission_id);
                                    return;
                                }
                            });
                        });
                    });

                    //then update submission in view
                    views.forEach(function(subs){ 
                        Daily.update({date:date, subid:subs.submission_id}, {count:subs.count})
                            .exec(function(err, daily){
                            if(err) {
                                success = false;
                                console.log('Error while creating daily count for ' + subs.submission_id);
                                return;
                            }
                        });
                    });

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
                
                var q = 'SELECT distinct(subid), sum(count) FROM ' +
                    '(SELECT subid, count FROM daily WHERE ' +
                    'date BETWEEN "' + date + '" and "' + today + '") as t GROUP BY subid';

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
                    dailys.forEach(function(daily){
                        Weekly.create({startDate:date, endDate:today, count: daily.count, subid:daily.subid})
                            .exec(function(err, weekly){
                            if(err)
                                console.log('Cannot create weekly model');
                        });
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
                var today = new Date();
                var prv = new Date();
                prv.setMonth(today.getMonth() - 1);

                //maybe its better to remove time portion 
                today = today.toISOString().slice(0, 19).replace('T', ' ');
                prv = prv.toISOString().slice(0, 19).replace('T', ' ');

                var q = 'SELECT distinct(subid), sum(count) FROM ' +
                    '(SELECT subid, count FROM daily WHERE ' +
                    'date BETWEEN "' + prv + '" and "' + today + '") as t GROUP BY subid';

                Daily.query(q, function(err, dailys){
                    if(err){
                        console.log('Database error while finding weekly data: ' + err);
                        return;
                    }

                    if(!dailys || dailys.length == 0){
                        console.log('Cannot find daily between ' + date + ' and ' + today);
                        return;
                    }

                    dailys.forEach(function(daily){
                        Monthly.create({date:today, count: daily.count, subid:daily.subid})
                            .exec(function(err, monthly){
                            if(err)
                                console.log('Cannot create Monthly model on ' + today + ' for ' + daily.subid);
                        });
                    });
                });

            },
            start: false,
            timeZone: "America/Los_Angeles"
        });

        job.start();
    }
};