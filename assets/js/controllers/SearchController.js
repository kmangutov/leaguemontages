angular.module('appControllers').controller("SearchController", 
  ['$scope', 'ChampionRoleService', 'ChampionService', 'BadgeTypeService', 'SubmissionService',
  function($scope, ChampionRoleService, ChampionService, BadgeTypeService, SubmissionService) {

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

    $scope.submit = function() { 
      
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

      SubmissionService.get.query(query, function(response){
        $scope.submissions = response;
        $scope.showResult = true;
        if(response.length != 0)
          $scope.hasData = true;
        else
          $scope.hasData = false;

          $scope.getData = {};
      });
    }
}]);