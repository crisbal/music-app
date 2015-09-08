(function() {
  'use strict';

  angular
    .module('musicPlayer')
    .controller('PlayerController', 
      ['$scope','$rootScope', PlayerController]);


  function PlayerController($scope, $rootScope) 
  {
    $rootScope.$on('changeSong', function(event, url){
      var audio = $("#player");      
      $("#playerSource").attr("src", url);
      /****************/
      audio[0].pause();
      audio[0].load();//suspends and restores all audio element

      audio[0].oncanplaythrough = audio[0].play();
    });
  }

})();