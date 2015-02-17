var controller = angular.module('appControllers');

controller.controller('MainController', ['$scope', '$http', '$window', '$location', 'AuthService',
  function($scope, $http, $window, $location, AuthService){
        //variable to hold main stuffs (user, etc)

        //to loginview page -->

        //nav menu, if login (username)
        //          if logout (login, signup)
        
        //display ondemmand video
        //hot this week/monthly
        //feature video
        //etc


    $scope.userinfo = $window.sessionStorage;
    $scope.logState = AuthService.logState();

    console.log("Main controller start.");
    console.log($window.sessionStorage.username);
    console.log($scope.userinfo.logState);
    console.log($scope.userinfo.token);


    //call /auth/logout and only viable when user is logged in
    $scope.logout = function(){
        AuthService.logout();

        delete $window.sessionStorage.username;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.userid;

        $window.sessionStorage.logState = false;
    };
}]);