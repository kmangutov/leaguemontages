angular.module('appDirectives').directive('warning', ['$timeout', 'AuthService', 'UtilService',
    function($timeout, AuthService, UtilService){
    return {
        restrict: 'EA', //Element Attribute
        /**
         * @param message - message to be display for warning
         * @param time - time interval that the message will be displayed
         * @param redirect (optional) - redirect url 
         */
        scope: { 
            message: '@',
            redirect: '@',
            time: '@'
        },

        controller: function($scope){
            console.log("Warning directive");
            $scope.warning = {};
            
            $scope.warning.url = $scope.redirect;
            $scope.warning.time = $scope.time; //sec
            $scope.warning.message = $scope.message;
            $scope.redirectShow = ($scope.redirect != undefined) ? true : false;
            $scope.displayShow = !$scope.redirectShow;

            $scope.logState = AuthService.logState();
            console.log(JSON.stringify($scope.warning));
            console.log($scope.show);
            if($scope.redirect != undefined){
                $scope.timeout = UtilService.redirectWithSecond($scope.warning).then(function(){
                    $timeout.cancel($scope.timeout);
                });
            } else {
                $scope.timeout = UtilService.displayWithSecond($scope.warning).then(function(){
                    $timeout.cancel($scope.timeout);
                    $scope.displayShow = false;
                })
            }
        },

        templateUrl: 'views/directiveTemplates/WarningSection.html',

        link: function(scope, element, attrs) {
            //change hide/show element when no redirect provide
        }
    };
}]);
