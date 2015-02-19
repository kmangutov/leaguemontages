angular.module('appControllers').controller("SearchController", 
  ['$scope', 'ChampionRoleService', 'UtilService', 'ChampionService','BadgeTypeService', 'BadgeService', 'SubmissionService',
  function($scope, ChampionRoleService, UtilService, ChampionService, BadgeTypeService, BadgeService, SubmissionService) {

    $scope.tagline = "searchView";

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
    });

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    BadgeTypeService.query({}, function(badgeService){
      $scope.badgeTypes = badgeService;
    });

    $scope.getData = {};
    $scope.submissions = [];
    $scope.keyword = "";
    $scope.showResult = false;
    $scope.hasData = false;
    $scope.badgeTypeMap = {};
    $scope.layout = "grid";


    //pagination
    //$scope.filteredSubmissions = [];
    //$scope.currentPage = 1;
    $scope.perPage = 2;
    //$scope.maxSize = 5;
    //order by badges 
    //submissions is filled by search already

    $scope.submit = function() { 
      console.log($scope.getData);
      //manipulate query
      if($scope.keyword != "")
        $scope.getData.title = {"contains":$scope.keyword};
      
      //if badgetype is on, order desc count badge of badgetype   
      //add other attribute fields
      var query = {};
      if(!(JSON.stringify($scope.getData) === '{}')){
        query = {"where":$scope.getData};
      }

      console.log("GET " + JSON.stringify(query));

      SubmissionService.query(query, function(response){
        $scope.showResult = true;

        if(response.length != 0)
          $scope.hasData = true;
        else
          $scope.hasData = false;

        //for each submission, get badges in human readable way
        angular.forEach(response, function(submission){
          submission.badges = BadgeService.getBadges($scope.badgeTypes, submission.badges);
          //add submision link
          submission.link = "kirill#/submission/" + submission.id;
          submission.ratings = UtilService.getRatings(submission.ratings);
        });
        
        $scope.submissions = response;
        //clear out query 
        $scope.getData = {};
      });
    }
}]);