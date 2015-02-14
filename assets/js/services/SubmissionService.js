
var services = angular.module('appServices');

services.factory('SubmissionService', 
  function($resource){

  return {
    get: $resource('/api/v1.0/Submission', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      }
    }),

    update: $resource('/api/v1.0/Submission/:id', {id:"@id", view:"@count"}, {
       query: {
          method: 'PUT'
       }
    })
  };
});
