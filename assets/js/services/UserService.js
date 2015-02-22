var services = angular.module('appServices');

services.factory('UserService', 
  function($resource){

  return $resource('/api/v1.0/User', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  })
});