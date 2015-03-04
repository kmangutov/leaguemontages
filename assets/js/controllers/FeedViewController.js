angular.module('appControllers').controller('FeedViewController', 
    ['$scope','$window','$timeout', 'AuthService', 'UtilService',
    function($scope, $window, $timeout, AuthService, UtilService){
    
      $scope.isLogged = AuthService.logState().isLogged;
      console.log("feed view controller");
      console.log($scope.isLogged);
    }
]);