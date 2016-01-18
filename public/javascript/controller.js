var visualApp = angular.module('visualApp', ['ngRoute']);

visualApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'pages/home.html'
      // controller: 'homeController'
    });
}]);
