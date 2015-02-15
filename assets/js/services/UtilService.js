
/**
 * Utils services
 *
 * Any utility service that can be reuse anywhere goes here 
 *
 */
var services = angular.module('appServices');

services.factory('UtilService', function($http, $interval, $timeout, $window){
  
  var utils = {};

  /**
   * @params: args object contains url and time left
   * {url: redirect url, time: sec}
   * 
   * in addition, don't forget to clean up timeout after it is used
   * by calling timeout.cancel(timeoutVariable) where variable is the
   * promise that has been returned from this method
   */
  utils.redirectWithSecond = function(args){
    
    var promise = $interval(function(){
      args.time -= 1;
      console.log(args.time);
    }, 1000);

    var timeout = $timeout(function(){
      $window.location.href = args.url;
      $interval.cancel(promise);
    }, args.time * 1000);

    return timeout;
  };

  return utils;
});