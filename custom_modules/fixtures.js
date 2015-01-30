function doFixture(fixture) {
    //first, check if this fixture is populated
    fixture.model.findOne(fixture.data[0], function(err, output) {

        if(err) sails.log("Error in fixtures: " + err);
        else if(!output) {

            //if it's not populated, insert data
            sails.log("Running fixture: " + name);
            fixture.data.forEach(function(item) {

                fixture.model.create(item).exec(function(e, newItem) {
                    if(e) sails.log("Error in fixture '"+name+"': " + e);
                });
            });
        }
        else if(output) 
            sails.log("Ignoring fixture: " + fixture.name);
    });
}



module.exports = {
    run: function() {

        fixtureBadgeType = {
            name: "Badge_type",
            model: Badge_type, 
            data: [ 
                {name: "Skilled"},
                {name: "Creative"}, 
                {name: "Editing"},
                {name: "Humor"}
            ]
        };

        fixtureChampionRole = {
            name: "Champion_role",
            model: Champion_role,
            data: [
                {name: "Top"},
                {name: "Jungle"},
                {name: "Mid"},
                {name: "Ad Carry"},
                {name: "Support"}
            ]
        };

        fixtureSubmissionType = {
            name: "Submission_type",
            model: Submission_type,
            data: [
                {name: "Tutorial"},
                {name: "Montage"},
                {name: "Full Game"}
            ]
        };

        fixtureUserType = {
            name: "User_type",
            model: User_type,
            data: [
                {utype: "Administrator"},
                {utype: "Approver"},
                {utype: "User"}
            ]
        };

        fixtures = [
            fixtureBadgeType,
            fixtureChampionRole,
            fixtureSubmissionType,
            fixtureUserType
        ];

        fixtures.forEach(function(fixture){
            doFixture(fixture);
        });
    }
}
