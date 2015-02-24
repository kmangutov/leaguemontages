
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
   * promise that has been returned from this method. 
   * OR maybe we can just clean it up in here.. 
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

  utils.displayWithSecond = function(args){
    var promise = $interval(function(){
      args.time -= 1;
    }, 1000);

    var timeout = $timeout(function(){
      $interval.cancel(promise);
    }, args.time * 1000);

    return timeout;
  };

  utils.getRatings = function(ratings){
    var totalRating = 0;
    if(ratings.length != 0){
      angular.forEach(ratings, function(rating){
        totalRating += rating.value;
      });
      totalRating /= ratings.length;
    }
    return totalRating;
  };

  utils.checkFollowing = function(followerId, followingId){
    console.log('/api/v1.0/UserFollower?follower='+followerId+'&following='+followingId);
    var promise = $http.get('/api/v1.0/UserFollower?follower='+followerId+'&following='+followingId)
                       .then(function(res){
                          console.log(JSON.stringify(res.data));
                          if(res.data.length == 0)
                            return {id: 0, ret:false};
                          else
                            return {id:res.data[0].id, ret:true};
                       });
    return promise;
  }
  
  utils.follow = function(followerId, followingId){
    var promise = $http.post('/api/v1.0/UserFollower' , {follower: followerId, following:followingId})
                      .then(function(res){
                        return {id:res.data.id, ret:true};
                      });

    return promise;
  };

  utils.unfollow = function(id){
    var promise = $http.delete('/api/v1.0/UserFollower/'+id).then(function(res){
      return {id:0, ret:false};
    });
    return promise;
  };

  return utils;
});