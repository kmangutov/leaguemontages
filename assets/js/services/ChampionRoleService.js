var services = angular.module('appServices');

services.factory('ChampionRoleService', 
  function($resource){

  return $resource('/api/v1.0/ChampionRole', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});