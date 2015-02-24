var app = angular.module("app", [
  'ngRoute',
  'appControllers',
  'appServices',
  'appDirectives',
  'appFilters',
  'angularUtils.directives.dirPagination'
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

    .when('/feeds', {
      templateUrl: 'views/partials/feedView.html',
      controller: 'FeedViewController'
    })

    .when('/user/:display_name', {
      templateUrl: 'views/partials/UserView.html',
      controller: 'UserViewController',
      resolve: {
        pageUser: function($route, UtilService){
          return UtilService.getUser($route.current.params.display_name);
        }
      }
    })

    .when('/contact-us', {

    })

    .when('/about', {

    })

    .when('/policy', {
      
    })

    .otherwise({
      templateUrl: 'views/404.html',
    });
}]);
