var app = angular.module("app", [
  'ngRoute',
  'appControllers',
  'appServices'
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/submit', {
      templateUrl: 'views/partials/SubmitView.html',
      controller: 'SubmitController'
    })

    .when('/search', {
      templateUrl: 'views/partials/SearchView.html',
      controller: 'SearchController'
    })
    
    .when('/submission/:id', {
      templateUrl: 'views/partials/SubmissionView.html',
      controller: 'SubmissionViewController'
    })

    .otherwise({
      redirectTo: '/submit'
    });
}]);
