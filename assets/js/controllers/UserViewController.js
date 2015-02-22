var controller = angular.module('appControllers');

controller.controller('UserViewController', 
    ['$scope', '$routeParams', 'AuthService','UserService', 'BadgeTypeService', 'UtilService',
  function($scope, $routeParams, AuthService, UserService, BadgeTypeService, UtilService){
    $scope.userview = {};
    $scope.userview.display_name = $routeParams.display_name;
    $scope.pageUser = undefined;

    //validate display name
    UserService
        .query({display_name:$scope.userview.display_name})
        .$promise
        .then(function(user){  
            if(user.length == 0)
                $scope.isValidUser = false;
            else {
                $scope.isValidUser = true;
                $scope.pageUser = user[0];
            }
        });

    //get total badges, ratings
    //display submissions 
    //follwing/follwer count

    //if visitor is user himself, display some analytics (weekly,monthly,daily counts etc)
}]);