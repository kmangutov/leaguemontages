
var controllers = angular.module('appControllers', []);

controllers.controller("SubmitController", 
  ['$scope', 'ChampionRoleService', function($scope, ChampionRoleService) {

    console.log("hello");
    $scope.message = "message";

    ChampionRoleService.get({}, function(championRoleService) {
      console.log(championRoleService);
    });

    $scope.roles = ["Top", "Jungle", "Mid", "Ad Carry", "Support"];

}]);