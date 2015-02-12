var services = angular.module('appServices');

services.factory('AuthService', ['$http', function($http){
    var authobj = {};

    authobj.getToken = function (){
        return $http.get('/api/v1.0/user/jwt');
    };

    authobj.register = function(name, email, password){
        return $http.post('/api/v1.0/user/register', {display_name: name, email:email, password:password});
    };

    authobj.login = function (email, password){
        return $http.post('/api/v1.0/auth/login', {email:email, password:password});
    };

    authobj.logout = function (){
        return $http.get('/api/v1.0/auth/logout');
    };

    return authobj;
}]);