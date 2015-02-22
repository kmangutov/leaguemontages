angular.module('appControllers').controller("SubmissionViewController", 
  ['$scope','$window','$timeout', '$routeParams','AuthService', 'UtilService', 'BadgeTypeService', 'BadgeService', 'SubmissionService', 'CommentService',
  function($scope, $window, $timeout, $routeParams, AuthService, UtilService, BadgeTypeService, BadgeService, SubmissionService, CommentService) {

    //console.log("id is " + $routeParams.id);
    $scope.tagline = "submissionView";
    $scope.subid = $routeParams.id;
    $scope.error = null;
    $scope.isAccessible = true;
    $scope.logState = AuthService.logState();
    console.log("subview created");
    console.log($scope.logState);

    CommentService.query({written_to: $scope.subid}, function(comments){
        $scope.comments = comments;
        console.log($scope.comments);
    });

    BadgeTypeService.query({}, function(badgetypes){
        $scope.badgetypes = badgetypes;
    });

    //calculate number of badges 
    //this can be done either frontend or backend
    //ideally this supposed to go to backend or service to reuse anywhere we want
    
    //ratings same as badge
    $scope.ratings = 0;

    SubmissionService
        .get({id: $scope.subid})
        .$promise
        .then(function(submission){
  
            //nested population doesnt support by sails atm 
            //therefore non-intutive way to display badge here

            //rating is simple
            $scope.ratings = UtilService.getRatings(submission.ratings);
            $scope.badges = BadgeService.getBadges($scope.badgetypes, submission.badges);
            //daily, monthly, weekly, 
            //any tags?

            //view counters
            $scope.subData = submission;
            $scope.userName = submission.createdBy.display_name;
            $scope.champion = submission.champ_type;
            $scope.championRole = submission.champ_role;
            $scope.subType = submission.sub_type;
            $scope.state = submission.state.state;
            $scope.views = submission.view + 1;
            
            //get counter up for viewCounter and model itself
            //submission.view.value += 1;
            SubmissionService.update({id:$scope.subid, view: $scope.views});
            $scope.isValidSubmission = true;

        }, function(errResponse) {
            $scope.error = errResponse;
            $scope.isValidSubmission = false;
        });

    //comments 
    //CommentService.query({written_to: $scope.subid})
    $scope.handleNonUser = function() {
        if(!AuthService.logState().isLogged) //no login handle it
        {
            $scope.isAccessible = false;
            $scope.timeout = UtilService.displayWithSecond({time:3}).then(function(){
                //after timeout was executed, reset or do whatever
                $scope.isAccessible = true;
                //clean up used timeout promise
                $timeout.cancel($scope.timeout);
            });
            return false;
        }
        return true;
    };

    $scope.badgeHandler = function(badgeName) {
        if(!$scope.handleNonUser())
            return;

        var postData = {};
        postData.given_to = $scope.subid;
        postData.from = $window.sessionStorage.userid; 
        postData.badge_type = $scope.badges[badgeName].badgeId;
        
        var badge = new BadgeService.get(postData);
        
        console.log(badge.$promise);

        badge.$save().then(function(data){
            console.log("succeeed");
            $scope.badges[badgeName].badgeCount += 1;
        }, function(data){
            //TODO: if it is already given, re-click -> remove badge ??
            console.log("cannot add badge");
        });
        console.log("Badge added " + badgeName + " and id " + $scope.badges[badgeName].badgeId);        
    };

    //comment related funcitonalities 
    $scope.newComment = "";
    $scope.submitComment = function() {
        if(!$scope.handleNonUser())
            return;

        console.log("adding new comment");
        var postData = {};
        postData.written_to = $scope.subid;
        postData.written_by = $window.sessionStorage.userid;
        postData.text = $scope.newComment;

        var comment = new CommentService(postData);
        comment.$save().then(function(data){
            data.written_by = {display_name:AuthService.logState().username};
            $scope.comments.push(data);
            console.log(data);
        }, function(errData){
            console.log("cannot add comment");
        });
        $scope.newComment = "";g
    };

    $scope.deleteComment = function(comment){
        console.log("Deleting comment id " + comment.id);
        //validate owner first
        if(comment.written_by.display_name != $scope.logState.username)
        {
            console.log("Cannot delete other comment");
            return;
        }

        CommentService.delete({id:comment.id});
        //some animation?
        var index = $scope.comments.indexOf(comment);
        $scope.comments.splice(index, 1);
    };

    $scope.editing = 0;
    $scope.editable = "";
    $scope.editComment = function(comment){
        console.log("Editing comment id " + comment);
        $scope.editable = comment.text;
        $scope.editing = comment.id;
    };

    $scope.editDone = function(comment){
        $scope.editing = false;
        if($scope.editable != comment.text){
            CommentService.update({id:comment.id, text:comment.text});
        }
        $scope.editable = "";
    };

    $scope.$on("destroy", function(event){
      $timeout.cancel($scope.timeout);
    })

    
}]);