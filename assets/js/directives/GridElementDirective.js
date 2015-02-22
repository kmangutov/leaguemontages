angular.module('appDirectives').directive('gridElement', function(){
    return {
        restrict: 'A', //Element Attribute
        link: function(scope, element, attrs) {
            $(element).hover(function(){
                $(element).find('.caption').slideDown(250);
            }, function(){
                $(element).find('.caption').slideUp(250);
            });
        }
    };
});
