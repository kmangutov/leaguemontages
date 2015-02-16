angular.module('appControllers').controller("SubmitController", 
  ['$scope', '$window','$timeout', '$location', '$upload','UtilService', 'SubmissionTypeService', 'ChampionRoleService', 'ChampionService', 'SubmissionService',
  function($scope, $window, $timeout, $location, $upload, UtilService, SubmissionTypeService, ChampionRoleService, ChampionService, SubmissionService) {

    $scope.tagline = "submitView";

    $scope.file = {};
    $scope.file.data = "";
    $scope.missingField = false;
    $scope.isLogged = false;

    //validation if there is no logged in user
    //notify and redirect to home 
    console.log("token - " + $window.sessionStorage.token);
    console.log(typeof $window.sessionStorage.token);
    
    $scope.warning = {};
    $scope.warning.url = 'http://localhost:1337/kirill#/login';
    $scope.warning.time = 5; //sec

    if($window.sessionStorage.token === undefined){
      $scope.timeout = UtilService.redirectWithSecond($scope.warning).then(function(){
        $timeout.cancel($scope.timeout);
      });
    } else {
      $scope.isLogged = true;
      console.log("setting logged is true");
    }

    //init form data
    ChampionRoleService.query({}, function(championRoleService) {
      $scope.roles = championRoleService;
    });

    ChampionService.query({}, function(championService) {
      $scope.champions = championService;
    });

    SubmissionTypeService.query({}, function(subtypes){
      $scope.sub_types = subtypes;
    });

    $scope.postData = {
      champ_type: 1,
      champ_role: 1
    };

    //add user id and token 
    $scope.postData.createdBy = $window.sessionStorage.userid;
    $scope.postData.access_token = $window.sessionStorage.token;

    //if token is missing, redirect user to login page to create session 
    console.log("user " + $scope.postData.createdBy + " and token " + $scope.postData.token);

    $scope.submit = function() {
      //upload file and get url 
      
      //TODO: before creation of submission, we might want to
      //validate user input to prevent XSS or other attakcs that
      //user may cause to harm the server or other users 
      if ($scope.file.data[0]){
        $scope.missingField = false;

        $upload.upload({
          url: 'api/v1.0/upload',
          fileFormDataName: 'uploadFile',
          method: 'POST',
          file: $scope.file.data[0]
        }).progress(function(evt){
          var progressPercentage = parseInt(100.0 * evt.loaded/evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.name);
        }).success(function (data, status, headers, config){
          //upload video to the server first
          console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data.file[0]));
          var fd = data.file[0].fd.split("/");
          var filename = fd[fd.length -1];

          //generated url and set it to url for postData
          $scope.postData.url = "/cdn/" + filename;
          console.log($scope.postData.url);
      
          //post submission
          var stringData = JSON.stringify($scope.postData);
          console.log("PUT " + stringData); 

          var submission = new SubmissionService.get($scope.postData);
          submission.$save()
                .then(function(res){
                    console.log(res.id);
                    //redirect user to submission view
                    $window.location.href = 'http://localhost:1337/kirill#/submission/' + res.id;
          });   
        });
      }
      else{
        $scope.missingField = true;
      }
    }

    //clean up on view destroy
    $scope.$on("destroy", function(event) {
      console.log("Clean up timeout variable");
      $timeout.cancel($scope.timeout);
    });
}]);

