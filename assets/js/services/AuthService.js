var services = angular.module('appServices');

services.service('AuthService', ['$http', '$window', '$rootScope', 
                function($http, $window, $rootScope){
    var authobj = {};
    var logState = {isLogged: false, username: "", userid: 0};

    $rootScope.$watch(function(){
        return $window.sessionStorage.logState;
    }, function callback(newVal, oldVal){
        if(newVal == "true"){
            logState.isLogged = true;
            logState.username = $window.sessionStorage.username;
            logState.userid = $window.sessionStorage.userid;
            logState.token = $window.sessionStorage.token;
        }
        else
            logState.isLogged = false;
        console.log("SERV STATE " + logState.isLogged);
    });


    authobj.logState = function(){
        return logState;
    };

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