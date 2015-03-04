angular.module('appDirectives').directive('followSection', 
    ['UtilService','AuthService','$timeout', 
    function(UtilService, AuthService, $timeout){
    return {
        restrict: 'A', //Element Attribute
        /** 
         * @param: targetuser - a user to be tested for follow state
         * @param: warnings - boolean variable to identify if there is a login user or not
         */
        scope: { 
            targetuser: '=',
            warnings:'=' //TODO: this can be controlled here 
        },
        
        controller: function($scope) {
            $scope.logstate = AuthService.logState();

            UtilService.checkFollowing($scope.logstate.userid, $scope.targetuser)
                    .then(function(isfollowing){
                    console.log("returned " + JSON.stringify(isfollowing));
                    $scope.followstate = isfollowing;
                });

            $scope.handleNonUser = function() {
                if(!$scope.logstate.isLogged) //no login handle it
                {
                    $scope.warnings = false;
                    $scope.timeout = UtilService.displayWithSecond({time:3}).then(function(){
                        //after timeout was executed, reset or do whatever
                        $scope.warnings = true;
                        //clean up used timeout promise
                        $timeout.cancel($scope.timeout);
                    });
                    return false;
                }
                return true;
            };

            $scope.follow = function(){
                console.log("follow button was clicked");
                if(!$scope.handleNonUser())
                    return;

                console.log("processing following");

                UtilService.follow($scope.logstate.userid, $scope.targetuser)
                    .then(function(data){
                    $scope.followstate = data;
                });
            };

            $scope.unfollow = function(){
                console.log("unfollow button was clicked");
                if(!$scope.handleNonUser())
                    return;

                console.log("processing unfollowing");
                UtilService.unfollow($scope.followstate.id)
                    .then(function(data){
                    $scope.followstate = data;
                });
            };
        },

        templateUrl: 'views/directiveTemplates/followSection.html',

        link: function(scope, element, attrs) {
            //DOMs
        }
    };
}]);
