var route = angular.module('appRoutes', []);

route.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider.when('/', {
            templateUrl: 'views/main.html'
        })

        .when('/login', {
            templateUrl: 'views/login.html'
        })

        .when('/logout', {
            templateUrl: 'views/main.html'
        })

        //only care define route, otherwise 404
        .otherwise({
            templateUrl: 'views/404.html'
        });

        $locationProvider.html5Mode(true);
  }]);
