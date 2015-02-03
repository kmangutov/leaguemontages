
var controllers = angular.module('appControllers', []);

controllers.controller("SubmitController", 
  ['$scope', 'ChampionRoleService', function($scope, ChampionRoleService) {

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });
}]);