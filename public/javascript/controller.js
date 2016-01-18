var visualApp = angular.module('visualApp', ['ngRoute', 'ui.bootstrap']);

visualApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'pages/home.html'
      // controller: 'homeController'
    });
}]);
