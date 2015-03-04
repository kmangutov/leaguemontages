var controller = angular.module('appControllers');

controller.controller('UserViewController', 
    ['$scope','$timeout', '$routeParams', 'AuthService','pageUser', 'UserService', 'BadgeTypeService', 'UtilService',
  function($scope, $timeout, $routeParams, AuthService, pageUser, UserService, BadgeTypeService, UtilService){

    $scope.userview = {};
    $scope.userview.display_name = $routeParams.display_name;
    $scope.pageUser = pageUser.data[0];
    $scope.isAccessible = true;

    console.log("user view ");
 
    $scope.isValidUser = $scope.pageUser.isValidUser;
    $scope.userid = $scope.pageUser.id;
    $scope.followers = $scope.pageUser.follower.length;
    $scope.followings = $scope.pageUser.following.length;
    $scope.loaded = false;
  
    //watch on followState to change counter in real time
    $scope.$watch('followState', function(newVal, oldVal){
        if(newVal == oldVal)
            return;

        if($scope.loaded){
            if($scope.followState.ret == true)
                $scope.followers += 1;
            else
                $scope.followers -= 1;
        }
        $scope.loaded = true;
    });
    
    //submissions 
    //total badges
    
}]);