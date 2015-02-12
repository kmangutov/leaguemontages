angular.module('appControllers').controller('LoginViewController', 
    ['$scope', '$window', '$location', 'AuthService',
    function($scope, $window, $location, AuthService){

    $scope.formData = {};

    $scope.isSuccessed = false;
    $scope.hasFailed = false;

    //maybe we want to make this error message available in global
    $scope.errors = {"failCredential": "email or password not match", 
                        "tokenError": "cannot retrieve token",
                        "signupError": "Either email or display_name is already in used"};

    $window.sessionStorage.token = null;

    $scope.login = function() {
        //call auth/login
        //call user/jwt
        console.log("login was pressed");
        AuthService.login($scope.formData.email, $scope.formData.password)
            .success(function(loginData){
                console.log(JSON.stringify(loginData));
                $scope.formData.name = loginData.display_name;
                AuthService.getToken()
                    .success(function(data){
                        //keep least amount of info to pass it along with other controller 
                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.username = loginData.display_name;
                        console.log($window.sessionStorage.username)
                        $scope.hasFailed = false;
                        $location.url('/'); //go to main view  
                    })
                    .error(function(data){
                        $scope.result = $scope.errors.tokenError;
                        $scope.hasFailed = true;
                        delete $window.sessionStorage.token;
                    })
            })
            .error(function(data){
                $scope.result = $scope.errors.failCredential;
                $scope.hasFailed = true;
            });

           
    };

    /* To main view 
    $scope.logout = function() {
        //call auth/logout 
        AuthService.logout()
            .success(function(data){

            })
            .error(function(data){

            });
    };
    */
    
    $scope.register = function() {
        console.log("register clicked");
        //modal('hide');
        //call /user/register
        AuthService.register($scope.formData.name, $scope.formData.email, $scope.formData.password)
            .success(function(data){
                $scope.isSuccessed = true;
                $scope.hasFailed = false;
                angular.element(document.querySelector('.close')).click();
                //message to success
            })
            .error(function(data){
                //display error
                $scope.hasFailed = true;
                $scope.result = $scope.errors.signupError;
                //for (var key in data.error.invalidAttributes) {
                //    $scope.result = data.error.invalidAttributes[key][0].message; 
                //}
                //console.log($scope.result);
            });
    };

}]);