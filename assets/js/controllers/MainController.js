var mainController = angular.module('MainCtrl', []);


mainController.controller('MainController', function($scope, $location, $log, $window){
    $scope.tagline = "This is Main";
    $scope.isLogged = false;

    //global functionalities 
    $scope.login = function() {

    };

    $scope.logout = function() {

    };

    $scope.signup = function() {

    };

});