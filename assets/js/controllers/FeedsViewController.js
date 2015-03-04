angular.module('appControllers').controller('FeedsViewController', 
    ['$scope', '$timeout', '$window', 'AuthService', 'UtilService','SubmissionService', 'UserService',
    function($scope, $timeout, $window, AuthService, UtilService, SubmissionService, UserService){

    $scope.logState = AuthService.logState();

    //handle no login user
    $scope.warning = {};
    $scope.warning.url = 'http://localhost:1337/#/login';
    $scope.warning.time = 5; //sec

    if(!$scope.logState.isLogged){
      $scope.timeout = UtilService.redirectWithSecond($scope.warning).then(function(){
        $timeout.cancel($scope.timeout);
      });
    } 

    //get list of followings 
    //submissions from followings
    
}]);