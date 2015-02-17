var appDirectives = angular.module('appDirectives', []);

appDirectives.config(['$logProvider', function($logProvider) {
    $logProvider.debugEnabled(true);
}]);