var app = angular.module("app", [
  'ngRoute',
  'appControllers',
  'appServices'
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/index.html'
    })

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

    .when('/login', {
      templateUrl: 'views/partials/LoginView.html',
      controller: 'LoginViewController'
    })

    .otherwise({
      templateUrl: 'views/404.html',
    });
}]);
