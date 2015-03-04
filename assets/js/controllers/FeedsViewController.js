angular.module('appControllers').controller('FeedsViewController', 
    ['$scope', '$timeout', '$window', 'AuthService', 'UtilService',
    function($scope, $timeout, $window, AuthService, UtilService){

    $scope.logState = AuthService.logState();

    $scope.warning = {};
    $scope.warning.url = 'http://localhost:1337/#/login';
    $scope.warning.time = 5; //sec

    if(!$scope.logState.isLogged){
      $scope.timeout = UtilService.redirectWithSecond($scope.warning).then(function(){
        $timeout.cancel($scope.timeout);
      });
    } else {
      console.log("setting logged is true");
    }

}]);