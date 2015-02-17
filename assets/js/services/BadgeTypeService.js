
var services = angular.module('appServices');

services.factory('BadgeTypeService', 
  function($resource){

  return $resource('/api/v1.0/BadgeType', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});

services.factory('BadgeService',
  function($resource, $http) {
  /* 
  return $resource('/api/v1.0/Badge', {}, {
    qeury: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
  */
  var service = {};

  service.get = $resource('/api/v1.0/Badge', {}, {
      qeury: {
        method: 'GET',
        params: {},
        isArray: true
      }
    }
  );

  //return promise and then portion will contains 
  //count of each badges and map to badge_type id
  service.counts = function(id){
    var promise = 
        $http.get('/api/v1.0/Badge?given_to='+id)
             .then(function(res){
                var badges = {};
                var badgeTypeMap = {};
                
                angular.forEach(res.data, function(badge){
                  var key = badge.badge_type.name;

                  if(!(key in badges)){
                    badges[key] = 1;
                    badgeTypeMap[key] = badge.badge_type.id;
                  }
                  else
                    badges[key] += 1;
                });
                console.log("service " + JSON.stringify(badges));

                return {badges: badges, map:badgeTypeMap};
              }, function(res){ //error
                return {status: res.status, data: res.data};
              });

    return promise;
  };

  return service;
});
