
var services = angular.module('appServices');

services.factory('SubmissionService', 
  function($resource){

  return $resource('/api/v1.0/Submission/:id', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      },
      update: {
        method: 'PUT',
        params: {id:'@id', view:'@view'}
      }
  });
});
