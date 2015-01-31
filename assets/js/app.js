
var app = angular.module("app", [
  'ngRoute',
  'appServices',
  'appControllers',
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/submit', {
      templateUrl: 'views/SubmitView.html',
      controller: 'SubmitController'
    }).
    otherwise({
      redirectTo: '/submit'
    });
}]);
