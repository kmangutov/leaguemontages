angular.module('appControllers').controller("SubmissionViewController", 
  ['$scope', '$routeParams', 'ChampionRoleService', 'ChampionService', 'SubmissionService',
  function($scope, $routeParams, ChampionRoleService, ChampionService, SubmissionService) {

    //console.log("id is " + $routeParams.id);
    $scope.tagline = "submissionView";
    $scope.subid = $routeParams.id;
    $scope.error = null;

    SubmissionService
        .get({id: $scope.subid})
        .$promise
        .then(function(submission){
            //count badge

            //count ratings
            //daily, monthly, weekly, 
            //any tags?

            //view counters
            $scope.subData = submission;
            $scope.userName = submission.createdBy.display_name;

            $scope.comments = submission.comments;
            $scope.champion = submission.champ_type;
            $scope.championRole = submission.champ_role;
            $scope.subType = submission.sub_type;
            $scope.state = submission.state.state;

            //get counter up for daily and model itself

        }, function(errResponse) {
            $scope.error = errResponse;
        });
    
}]);