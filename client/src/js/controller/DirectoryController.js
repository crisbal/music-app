(function() {
  'use strict';

  angular
    .module('musicPlayer')
    .controller('DirectoryController', 
      ['$scope','$rootScope', '$http','$routeParams',DirectoryController]);


  function DirectoryController($scope,$rootScope, $http, $routeParams) 
  {
    $http.get('http://localhost:8080/api/v1/' + $routeParams.path).
      then(function(response) {
        var data = response.data;
        $scope.files = data.files;
        $scope.folders = data.folders;
        $scope.path = $routeParams.path;
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.songClick = function(url){
      $rootScope.$emit('changeSong', url);
    };
  }

})();