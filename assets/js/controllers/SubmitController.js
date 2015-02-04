
var controllers = angular.module('appControllers', ['appServices']);

controllers.controller("SubmitController", 
  ['$scope', 'ChampionRoleService', 'ChampionService', 
  function($scope, ChampionRoleService, ChampionService) {

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
    });
}]);