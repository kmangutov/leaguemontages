angular.module('appFilters').filter('orderBadgeBy', function(){
  
  //input: submissions
  //attribute: badgeName
  return function(submissions, attribute) {
    if (!angular.isObject(submissions)) return submissions;

    var array = [];
    angular.forEach(submissions, function(sub){
        array.push(sub);
    });

    array.sort(function(a, b){
        a = parseInt(a.badges[attribute].badgeCount);
        b = parseInt(b.badges[attribute].badgeCount);
        return b-a;
    });
    return array;
  };
});