angular.module('appControllers').controller("SearchController", 
  ['$scope', 'ChampionRoleService', 'ChampionService', 'SubmissionService',
  function($scope, ChampionRoleService, ChampionService, SubmissionService) {

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
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
      
      //add other attribute fields
      var query = {};
      if(!(JSON.stringify($scope.getData) === '{}')){
        query = {"where":$scope.getData};
      }

      console.log("GET " + JSON.stringify(query));

      SubmissionService.query(query, function(response){
        $scope.submissions = response;
        $scope.showResult = true;
        if(response.length != 0)
          $scope.hasData = true;
        else
          $scope.hasData = false;

          $scope.getData = {};
      });
      /*
      $scope.showResult = true;
      console.log("result??");
      console.log($scope.submissions);
      
      $scope.submissions.$promise.then(function(result){
         $scope.result = result;
         console.log(result);
         if(result.lenght != 0)
            $scope.hasData = true;
          else
            $scope.hasData = false;
      });
      */
    }
}]);