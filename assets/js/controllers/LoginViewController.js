angular.module('appControllers').controller('LoginViewController', 
    ['$scope', '$window', '$location', 'AuthService',
    function($scope, $window, $location, AuthService){

    $scope.formData = {email:"", display_name:"", password:""};

    $scope.isSuccessed = false;
    $scope.hasFailed = false;

    //maybe we want to make this error message available in global
    $scope.errors = {"failCredential": "email or password not match", 
                        "tokenError": "cannot retrieve token",
                        "signupError": "Email or name is already in used"};

    //$window.sessionStorage.token = null;

    $scope.login = function() {

        console.log("login was pressed");
        AuthService.login($scope.formData.email, $scope.formData.password)
            .success(function(loginData){
                
                console.log(JSON.stringify(loginData));
                $scope.formData.name = loginData.display_name;
                $window.sessionStorage.userid = loginData.id;

                AuthService.getToken()
                    .success(function(data){
                        //keep least amount of info to pass it along with other controller 
                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.username = loginData.display_name;
                        $window.sessionStorage.logState = true;
                        console.log($window.sessionStorage.username)
                        $scope.hasFailed = false;
                        //set login state as true
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

    $scope.isFilled = {displayName:true, email:true, password:true};

    $scope.register = function() {
        console.log("register clicked");
        //check inputs
        //$scope.validuser
        //call /user/register

        //validation
        console.log($scope.formData);
        if($scope.formData.display_name == ""){
            $scope.isFilled.display_name = false;
            $scope.errors.display_name = "Required";
        } else $scope.isFilled.display_name = true;
        
        if($scope.formData.password == ""){
            $scope.isFilled.password = false;
            $scope.errors.password = "Required";
        } else if ($scope.formData.password.length < 8) {
            $scope.isFilled.password = false;
            $scope.errors.password = "Password is too short";
        } else $scope.isFilled.password = true;
        
        if($scope.formData.email == ""){
            $scope.isFilled.email = false;
            $scope.errors.email = "Required";
        } else $scope.isFilled.email = true;

        //if any of validation fails, then exit out of method
        if($scope.isFilled.email != true || $scope.isFilled.display_name != true ||
            $scope.isFilled.password != true)
            return;

        console.log(JSON.stringify($scope.formData));
        console.log("Registering....");
        AuthService.register($scope.formData.display_name, $scope.formData.email, $scope.formData.password)
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
                for (var key in data.error.invalidAttributes) {
                    //we need to change this message somehow
                    $scope.isFilled[key] = false;
                    $scope.errors[key] = data.error.invalidAttributes[key][0].message; 
                }
                //console.log($scope.result);
            });
    };

}]);