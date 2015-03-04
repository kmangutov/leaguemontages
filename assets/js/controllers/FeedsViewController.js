angular.module('appControllers').controller('FeedsViewController', 
    ['$scope', '$timeout', '$window', 'AuthService', 'UtilService','SubmissionService', 'UserService', 'BadgeTypeService', 'BadgeService',
    function($scope, $timeout, $window, AuthService, UtilService, SubmissionService, UserService, BadgeTypeService,BadgeService){

    $scope.logState = AuthService.logState();

    //handle no login user
    $scope.warning = {};
    $scope.warning.url = 'http://localhost:1337/#/login';
    $scope.warning.time = 5; //sec

    if(!$scope.logState.isLogged){
      $scope.timeout = UtilService.redirectWithSecond($scope.warning).then(function(){
        $timeout.cancel($scope.timeout);
      });
    } 

    //need to resolve before load up
    BadgeTypeService.query({}, function(badgeService){
      $scope.badgeTypes = badgeService;
    });
    
    UserService.get({id:$scope.logState.userid}, function(user){
        $scope.followings = [];
        angular.forEach(user.following, function(fuser){
            $scope.followings.push({"createdBy":fuser.following}); //get list of following ids
        });
        
        var q = {"where":{"or":$scope.followings}};
        
        SubmissionService.query(q, function(submissions){
            angular.forEach(submissions, function(submission){
                submission.badges = BadgeService.getBadges($scope.badgeTypes, submission.badges);
                //add submision link
                submission.link = "/#/submission/" + submission.id;
                submission.ratings = UtilService.getRatings(submission.ratings);
            });
            $scope.submissions = submissions;
        });
    })
    //get list of followings 
    //submissions from followings
    
}]);