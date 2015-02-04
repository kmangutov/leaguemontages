
var services = angular.module('appServices');

services.factory('SubmissionService', 
  function($resource){

  return $resource('/api/v1.0/Submission', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});