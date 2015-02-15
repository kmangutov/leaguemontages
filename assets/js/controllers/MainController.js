var controller = angular.module('appControllers');

controller.controller('MainController', ['$scope', '$http', '$window', '$location', 
    function($scope, $http, $window, $location){
        //variable to hold main stuffs (user, etc)

        //to loginview page -->

        //nav menu, if login (username)
        //          if logout (login, signup)
        
        //display ondemmand video
        //hot this week/monthly
        //feature video
        //etc
        $scope.username = $window.sessionStorage.username;
        $scope.userinfo = $window.sessionStorage.userinfo;
        $scope.token = $window.sessionStorage.token;
        $scope.isLogged = false;
        if($scope.token !== undefined && $scope.username !== undefined)
            $scope.isLogged = true;
        
        console.log("Main controller start.");
        console.log(JSON.stringify($window.sessionStorage.username));
        console.log($scope.token);
3
}]);