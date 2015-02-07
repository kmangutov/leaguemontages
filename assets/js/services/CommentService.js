
var services = angular.module('appServices');

services.factory('CommentService', 
  function($resource){

  return $resource('/api/v1.0/comment', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});