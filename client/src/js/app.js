(function() {
  'use strict';

  angular
    .module('musicPlayer', 
      ['ngRoute'])
    .config(['$routeProvider','$locationProvider', Route]);

  function Route ($routeProvider, $locationProvider){
    $routeProvider.
      when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      }).
      when('/listen/:path*', {
          templateUrl: 'views/directory.html',
          controller: 'DirectoryController'
      }).
      otherwise({
          redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
  }  

})();