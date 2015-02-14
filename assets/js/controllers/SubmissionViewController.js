angular.module('appControllers').controller("SubmissionViewController", 
  ['$scope','$window', '$routeParams','BadgeTypeService', 'BadgeService', 'SubmissionService', 'CommentService',
  function($scope, $window, $routeParams, BadgeTypeService, BadgeService, SubmissionService, CommentService) {

    //console.log("id is " + $routeParams.id);
    $scope.tagline = "submissionView";
    $scope.subid = $routeParams.id;
    $scope.error = null;

    CommentService.query({written_to: $scope.subid}, function(comments){
        $scope.comments = comments;
        console.log($scope.comments);
    });

    //calculate number of badges 
    //this can be done either frontend or backend
    //ideally this supposed to go to backend or service to reuse anywhere we want
    $scope.updateBadges = function() {
        $scope.badges = {};
        $scope.badgeTypeMap = {};

        console.log("updating badges");
        BadgeService.counts($scope.subid)
            .then(function(data){
                $scope.badges = data.badges;
                $scope.badgeTypeMap = data.map;
            }, function(data){
                //error handler
                console.log("Badge service error");
                console.log(data.status);
                console.log(data.data);
            });
    };

    $scope.updateBadges();
    //ratings same as badge
    $scope.ratings = 0;

    SubmissionService.get
        .get({id: $scope.subid})
        .$promise
        .then(function(submission){
  
            //nested population doesnt support by sails atm 
            //therefore non-intutive way to display badge here

            //rating is simple
            angular.forEach(submission.ratings, function(rating){
                $scope.ratings += rating.value;
            });
            $scope.ratings /= submission.ratings.length;
            
            //daily, monthly, weekly, 
            //any tags?

            //view counters
            $scope.subData = submission;
            $scope.userName = submission.createdBy.display_name;
            $scope.champion = submission.champ_type;
            $scope.championRole = submission.champ_role;
            $scope.subType = submission.sub_type;
            $scope.state = submission.state.state;
            $scope.views = submission.view;
            
            //get counter up for viewCounter and model itself
            submission.view.value += 1;
            SubmissionService.update.query({id:$scope.subid, count: $scope.views + 1});

        }, function(errResponse) {
            $scope.error = errResponse;
        });

    $scope.addBadge = function(badgeName) {
        var postData = {};
        postData.given_to = $scope.subid;
        postData.from = $window.sessionStorage.userid; 
        postData.badge_type = $scope.badgeTypeMap[badgeName];
        
        if(postData.from == null) //no login handle it
        {
            //pop up and let user choose redirect to login page or stay
            return;
        }

        var badge = new BadgeService.get(postData);
        
        console.log(badge.$promise);

        badge.$save().then(function(data){
            console.log("succeeed");
            $scope.badges[badgeName] += 1;
        }, function(data){
            //TODO: if it is already given, re-click -> remove badge ??
            console.log("ccannot add badge");
        });
        console.log("Badge added " + badgeName + " and id " + $scope.badgeTypeMap[badgeName]);        
    };
    
}]);