
var services = angular.module('appServices');

services.factory('CommentService', 
  function($resource){
  
  return $resource('/api/v1.0/comment/:id', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    },
    update: {
      method: 'PUT',
      params: {id:'@id', text:'@text'}
    }
  });
});