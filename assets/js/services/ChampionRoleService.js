
var services = angular.module('appServices', ['ngResource']);

services.factory('ChampionRoleService', 
  ['$resource', function($resource){

  return $resource('/api/v1.0/ChampionRole', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: false
    }
  });
}]);