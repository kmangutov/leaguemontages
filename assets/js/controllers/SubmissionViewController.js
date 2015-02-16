angular.module('appControllers').controller("SubmissionViewController", 
  ['$scope','$window','$timeout', '$routeParams','UtilService', 'BadgeTypeService', 'BadgeService', 'SubmissionService', 'CommentService',
  function($scope, $window, $timeout, $routeParams, UtilService, BadgeTypeService, BadgeService, SubmissionService, CommentService) {

    //console.log("id is " + $routeParams.id);
    $scope.tagline = "submissionView";
    $scope.subid = $routeParams.id;
    $scope.error = null;
    $scope.isAccessible = true;

    CommentService.query({written_to: $scope.subid}, function(comments){
        $scope.comments = comments;
        console.log($scope.comments);
    });

    $scope.badgeTypeMap = {};
    $scope.badges = {};
    //calculate number of badges 
    //this can be done either frontend or backend
    //ideally this supposed to go to backend or service to reuse anywhere we want
    $scope.updateBadges = function() {
        console.log("updating badges");

        BadgeService.counts($scope.subid)
            .then(function(data){
                $scope.badges = data.badges;
  
                console.log($scope.badgeTypeMap);
            }, function(data){
                //error handler
                console.log("Badge service error");
                console.log(data.status);
                console.log(data.data);
            });
    };

    $scope.updateBadges();

    BadgeTypeService.query({}, function(badgetypes) {
        angular.forEach(badgetypes, function(badgetype){
            $scope.badgeTypeMap[badgetype.name] = badgetype.id;
            if(!(badgetype.name in $scope.badges))
                $scope.badges[badgetype.name] = 0;
        });
        
    });

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

    //comments 
    //CommentService.query({written_to: $scope.subid})
    $scope.badgeHandler = function(badgeName) {
        var postData = {};
        postData.given_to = $scope.subid;
        postData.from = $window.sessionStorage.userid; 
        postData.badge_type = $scope.badgeTypeMap[badgeName];
        
        if(postData.from == null) //no login handle it
        {
            $scope.isAccessible = false;
            $scope.timeout = UtilService.displayWithSecond({time:3}).then(function(){
                //after timeout was executed, reset or do whatever
                $scope.isAccessible = true;
                //clean up used timeout promise
                $timeout.cancel($scope.timeout);
            });
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

    $scope.$on("destroy", function(event){
      $timeout.cancel($scope.timeout);
    })

    
}]);