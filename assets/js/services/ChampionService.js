
var services = angular.module('appServices');

services.factory('ChampionService', 
  function($resource){

  return $resource('/api/v1.0/Champion', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});