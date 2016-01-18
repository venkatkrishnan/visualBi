angular.module('visualApp').controller('homeController', function($scope, $http, $log) {

  $http.get('/tabs').success(function(data) {
    $scope.dashboards = data.dashboards;
    $scope.currentTab = data.dashboards[0].tabId;

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.tabId;
    }

    $scope.isActiveTab = function(tabId) {
        return tabId == $scope.currentTab;
    }

    $scope.username = data.name;
  });

  $http.get('/dashboards').success(function(json) {
    $scope.dashboardItems = json;
    $scope.currentTab = json[0].tabId;

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.tabId;
    }

    $scope.isActiveTab = function(tabId) {
        return tabId == $scope.currentTab;
    }
  });

  $http.get('chartData/widgets').success(function(widget) {
    $scope.widgetItems = widget;
  });
});
