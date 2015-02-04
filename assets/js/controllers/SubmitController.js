
var controllers = angular.module('appControllers', ['appServices']);

controllers.controller("SubmitController", 
  ['$scope', 'ChampionRoleService', 'ChampionService', 'SubmissionService',
  function($scope, ChampionRoleService, ChampionService, SubmissionService) {

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
    });

    $scope.postData = {
      champ_type: 1,
      champ_role: 1
    };

    $scope.submit = function() {
      var stringData = JSON.stringify($scope.postData);
      console.log("PUT " + stringData); 

      var submission = new SubmissionService($scope.postData);
      submission.$save();
    }
}]);