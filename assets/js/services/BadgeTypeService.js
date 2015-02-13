
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
  function($resource) {
    
  return $resource('/api/v1.0/Badge', {}, {
    qeury: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});
