angular.module('appDirectives').directive('signUpModal', function(){
    return {
        restrict: 'EA', //Element Attribute
        /*scope: { //isolate scope and get errors attribute
            errors: '@err', //just value
            isFilled: '@errhandler',
            formData: '=', //two way binding
            action: '&' //function 
        },*/
        templateUrl: 'views/partials/SignupModal.html',
        //template: '<div><p>Testing directive...</p></div>',
        link: function(scope, element, attrs) {
            console.log('testing directive....link....');
        }
    };
});
