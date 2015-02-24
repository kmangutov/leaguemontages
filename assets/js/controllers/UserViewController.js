var controller = angular.module('appControllers');

controller.controller('UserViewController', 
    ['$scope','$timeout', '$routeParams', 'AuthService','pageUser', 'UserService', 'BadgeTypeService', 'UtilService',
  function($scope, $timeout, $routeParams, AuthService, pageUser, UserService, BadgeTypeService, UtilService){

    $scope.userview = {};
    $scope.userview.display_name = $routeParams.display_name;
    $scope.pageUser = pageUser.data[0];
    $scope.isAccessible = true;
    $scope.followState = {};

    console.log("user view ");
 
    $scope.isValidUser = $scope.pageUser.isValidUser;
    $scope.userid = $scope.pageUser.id;
    $scope.followers = $scope.pageUser.follower.length;
    $scope.followings = $scope.pageUser.following.length;
    console.log($scope.followState);
    //console.log($scope.userid + " " + JSON.stringify($scope.logState));
    //inherit maincontroller scope variable

    //validate display name
    //this might be resolve before page is load ... 
    /*
    UserService
        .query({display_name:$scope.userview.display_name})
        .$promise
        .then(function(user){  
            if(user.length == 0)
                $scope.isValidUser = false;
            else {
                $scope.isValidUser = true;
                $scope.pageUser = user[0];
                $scope.userid = $scope.pageUser.id;
                $scope.followers = $scope.pageUser.follower.length;
                $scope.followings = $scope.pageUser.following.length;

                //UtilService.checkFollowing($scope.logState.userid, $scope.userid)
                //    .then(function(isfollowing){
                //    console.log("returned " + JSON.stringify(isfollowing));
                //    $scope.followState = isfollowing;
                //});
                //display follow/following
                //get total badges, ratings
                //display submissions 
                //if visitor is user himself, display some analytics (weekly,monthly,daily counts etc)
            }
        });
    */
    /*
    $scope.handleNonUser = function() {
        if(!AuthService.logState().isLogged) //no login handle it
        {
            $scope.isAccessible = false;
            $scope.timeout = UtilService.displayWithSecond({time:3}).then(function(){
                //after timeout was executed, reset or do whatever
                $scope.isAccessible = true;
                //clean up used timeout promise
                $timeout.cancel($scope.timeout);
            });
            return false;
        }
        return true;
    };
    */
    /*
    $scope.follow = function(){
        console.log("follow button was clicked");
        if(!$scope.handleNonUser())
            return;
        console.log("processing following");

        UtilService.follow($scope.logState.userid, $scope.userid)
                .then(function(data){
                    $scope.followState = data;
                });
    };

    $scope.unfollow = function(){
        console.log("unfollow button was clicked");
        if(!$scope.handleNonUser())
            return;

        console.log("processing unfollowing");
        UtilService.unfollow($scope.followState.id)
                .then(function(data){
                    $scope.followState = data;
                })
    };
    */
}]);