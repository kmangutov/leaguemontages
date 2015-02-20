angular.module('appFilters').filter('orderByRating', function(){
  
  //input: submissions
  //attribute: badgeName
  return function(submissions, reverse) {
    if (!angular.isObject(submissions)) return submissions;

    var array = [];
    angular.forEach(submissions, function(sub){
        array.push(sub);
    });

    array.sort(function(a, b){
        a = parseFloat(a.ratings);
        b = parseFloat(b.ratings);
        return b - a;
    });
    return array;
  };
});