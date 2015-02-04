var app = angular.module("app", [
  'ngRoute',
  'appServices',
  'appControllers',
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/submit', {
      templateUrl: 'views/partials/SubmitView.html',
      controller: 'SubmitController'
    }).
    otherwise({
      redirectTo: '/submit'
    });
}]);
