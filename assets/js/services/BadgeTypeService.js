
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