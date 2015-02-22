angular.module('appDirectives').directive('badgeIcons', function(){
    return {
        restrict: 'A', //Element Attribute
        link: function(scope, element, attrs) {
            $("[rel='tooltip']").tooltip(); 
        }
    };
});
