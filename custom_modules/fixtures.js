function doFixture(fixture) {

    fixture.data.forEach(function(data) {

        fixture.model.findOne(data, function(err, output) {

            var location  = fixture.name + "::" + JSON.stringify(data);
            if(err) sails.log("Error in fixture " + location + ": " + err);
            else if(!output) {
                sails.log("Running fixture " + location);

                fixture.model.create(data).exec(function(e, newItem) {

                    if(e) sails.log("Error in fixture " + location + ": " + e);
                });
            }
            else if(output) {
                sails.log("Ignoring fixture " + location);
            }
        });
    });
}



module.exports = {
    run: function() {

        fixtureBadgeType = {
            name: "BadgeType",
            model: BadgeType, 
            data: [ 
                {name: "Skilled"},
                {name: "Creative"}, 
                {name: "Editing"},
                {name: "Humor"}
            ]
        };

        fixtureChampionRole = {
            name: "ChampionRole",
            model: ChampionRole,
            data: [
                {name: "Top"},
                {name: "Jungle"},
                {name: "Mid"},
                {name: "Ad Carry"},
                {name: "Support"}
            ]
        };

        fixtureSubmissionType = {
            name: "SubmissionType",
            model: SubmissionType,
            data: [
                {name: "Tutorial"},
                {name: "Montage"},
                {name: "Full Game"}
            ]
        };

        fixtureUserType = {
            name: "UserType",
            model: UserType,
            data: [
                {utype: "Administrator"},
                {utype: "Approver"},
                {utype: "User"}
            ]
        };

        fixtureSubState = {
            name: "SubmissionState",
            model: SubmissionState,
            data: [
                {state: "Pending"},
                {state: "Approved"},
                {state: "Rejected"},
            ]
        };

        fixtureChampion = {
            name: "Champion",
            model: Champion,
            data: [
                {name: "Aatrox"},
                {name: "Ahri"},
                {name: "Akali"},
                {name: "Lissandra"}
            ]
        };

        fixtures = [
            fixtureBadgeType,
            fixtureChampionRole,
            fixtureSubmissionType,
            fixtureUserType,
            fixtureSubState,
            fixtureChampion
        ];

        fixtures.forEach(function(fixture){
            doFixture(fixture);
        });
    }
}
