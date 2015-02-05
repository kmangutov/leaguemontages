var app = angular.module("app", [
  'ngRoute',
  'appControllers',
  'appServices',
  //'SearchControllers',
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/submit', {
      templateUrl: 'views/partials/SubmitView.html',
      controller: 'SubmitController'
    }).
    
    when('/search', {
      templateUrl: 'views/partials/SearchView.html',
      controller: 'SearchController'
    }).

    otherwise({
      redirectTo: '/submit'
    });
}]);
