angular.module('appControllers').controller("SubmitController", 
  ['$scope', '$location', '$upload', 'ChampionRoleService', 'ChampionService', 'SubmissionService',
  function($scope, $location, $upload, ChampionRoleService, ChampionService, SubmissionService) {

    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
    });

    $scope.postData = {
      champ_type: 1,
      champ_role: 1
    };

    $scope.file = {};
    $scope.file.data = "";

    $scope.upload = function () {
      //console.log($scope.file);
      
      if ($scope.file.data[0]){
        console.log("uploading file..");
        console.log($scope.file.data[0]);
        $upload.upload({
          url: 'api/v1.0/upload',
          //headers: {'Content-Type': $scope.file.data[0].type },
          fileFormDataName: 'uploadFile',
          method: 'POST',
          file: $scope.file.data[0]
        }).progress(function(evt){
          var progressPercentage = parseInt(100.0 * evt.loaded/evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.name);
        }).success(function (data, status, headers, config){
          console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data.file[0]));
          var fd = data.file[0].fd.split("/");
          var filename = fd[fd.length -1];
          $scope.postData.url = "/cdn/" + filename;
          console.log($scope.postData.url);
        });
      }
      
    }

    //$scope.uploader = new FileUploader();

    $scope.submit = function() {
      //upload file and get url 
      
      //$scope.upload(); //async?
      var stringData = JSON.stringify($scope.postData);
      console.log("PUT " + stringData); 

      var submission = new SubmissionService($scope.postData);
      submission.$save();


    }
}]);