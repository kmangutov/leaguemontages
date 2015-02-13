angular.module('appControllers').controller("SubmissionViewController", 
  ['$scope', '$routeParams','BadgeService', 'SubmissionService', 'RatingService', 'CommentService',
  function($scope, $routeParams, BadgeService, SubmissionService, RatingService, CommentService) {

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
    $scope.badges = {};

    BadgeService.query({given_to: $scope.subid}, function(badges){
        //$scope.badges = badges;
        //console.log($scope.badges);
        $scope.badges.Creative = 0;
        $scope.badges.Skilled = 0;
        $scope.badges.Humor = 0;
        $scope.badges.Editing = 0;
        
        angular.forEach(badges, function(badge){
            $scope.badges[badge.badge_type.name] += 1;
        });
    });

    //ratings same as badge
    $scope.ratings = 0;


    SubmissionService
        .get({id: $scope.subid})
        .$promise
        .then(function(submission){
  
            //nested population doesnt support by sails atm 
            angular.forEach(submission.ratings, function(rating){
                $scope.ratings += rating.value;
            });
                
            $scope.ratings /= submission.ratings.length;
            
            //count ratings
            //daily, monthly, weekly, 
            //any tags?

            //view counters
            $scope.subData = submission;
            $scope.userName = submission.createdBy.display_name;
            $scope.champion = submission.champ_type;
            $scope.championRole = submission.champ_role;
            $scope.subType = submission.sub_type;
            $scope.state = submission.state.state;

            
            //get counter up for viewCounter and model itself

        }, function(errResponse) {
            $scope.error = errResponse;
        });
    
}]);