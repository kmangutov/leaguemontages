angular.module('appDirectives').directive('lolVideo', function(){
    return {
        restrict: 'A', //Element Attribute
        link: function(scope, element, attrs) {
            console.log("adjust video tag");
            $("video").each(function(index){
                console.log("adjust video tag " + index);
                $(this).get(0).load();
                $(this).get(0).play();
                //$(this).get(0).pause();
            }); 
        }
    };
});
 
