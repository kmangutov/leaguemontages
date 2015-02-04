var app = angular.module("app", [
  'ngRoute',
  'appControllers',
  'appServices',
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
