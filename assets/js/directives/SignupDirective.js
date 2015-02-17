angular.module('appDirectives').directive('signUpModal', function(){
    return {
        restrict: 'EA', //Element Attribute
        //own scope binding with any parents
        /*scope: { //isolate scope and get errors attribute
            errors: '@err', //just value
            isFilled: '@errhandler',
            formData: '=', //two way binding
            action: '&' //function 
        },*/
        templateUrl: 'views/partials/SignupModal.html',
        //template: '<div><p>Testing directive...</p></div>',
        //controller: function($scope){
            //own controller
        //}
        link: function(scope, element, attrs) {
            console.log('testing directive....link....');
        }
    };
});
