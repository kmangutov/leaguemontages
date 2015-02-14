
var services = angular.module('appServices');

services.factory('SubmissionTypeService', 
  function($resource){

  return $resource('/api/v1.0/SubmissionType', {}, {
    query: {
      method: 'GET',
      params: {},
      isArray: true
    }
  });
});