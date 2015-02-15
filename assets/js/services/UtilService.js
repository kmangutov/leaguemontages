
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
   */
  utils.redirectWithSecond = function(args){
    console.log("in redirect service");
    console.log(JSON.stringify(args));
    var max = args.time;
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