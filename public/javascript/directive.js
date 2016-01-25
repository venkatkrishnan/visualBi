var visualApp = angular.module('visualApp');

visualApp.directive("headData", function() {
  return {
    restrict : 'E',
    templateUrl : 'pages/head.html'
  }
}).directive("tabsData", function($rootScope, $http) {
  return {
    restrict : 'E',
    templateUrl : 'pages/tabs.html',
    controller: function() {
      $http.get('/tabs').success(function(data) {
        $rootScope.dashboards = data.dashboards;
        $rootScope.currentTab = data.dashboards[0].tabId;

        $rootScope.onClickTab = function (tab) {
            $rootScope.currentTab = tab.tabId;
        }

        $rootScope.isActiveTab = function(tabId) {
            return tabId == $rootScope.currentTab;
        }

        $rootScope.username = data.name;
      });
    }
  };
}).directive("dashboardData", function($rootScope, $http, $log) {
  return {
    restrict : 'E',
    templateUrl : 'pages/dashboard.html',
    scope: {},
    link: function($scope, $element, $attr,scope) {
      $log.log("Calling link inside the dashboardData");
      var dashboardPromise = new Promise(function(resolve,reject) {
        $http.get('/dashboards').success(function(json) {
        $scope.dashboardItems = json;
        $scope.currentTab = json[0].tabId;

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.tabId;
        }

        $scope.isActiveTab = function(tabId) {
            return tabId == $scope.currentTab;
        }
        resolve("success");
      });
    });
    var widgetPromise = new Promise(function(resolve,reject) {
        $http.get('chartData/widgets').success(function(widgets) {
        $scope.widgetItems = widgets;

        // scope.widget = function(widgetId) {
        //   widgets.forEach(function(w) {
        //      if(w.widgetId === widgetId) {
        //         $scope.title = w.title;
        //         $scope.chartRenderer = w.chartRenderer;
        //         $scope.url = w.url;
        //         $scope.comments = w.comments;
        //      }
        //   });
        // }
        resolve("success");
      });
    });

    Promise.all([dashboardPromise,widgetPromise]).then(function() {
      $scope.dashboardItems.map(function(dashboardItem) {
        dashboardItem.rows.forEach(function(row) {
          $scope.widgetItems.forEach(function(widgetItem) {
            if(row.widgetId == widgetItem.widgetId) {
              row.title = widgetItem.title;
              row.chartRenderer = widgetItem.chartRenderer;
              row.url = widgetItem.url;
              row.comments = widgetItem.comments;
            }
          });
        });
      });
    });
  }};
}).directive("barChart", ['$log', 'plotContinentChart', 'gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotNorthEast', function($log,
                                                                    plotContinentChart, gdpPerCapitaBarChart, gdpStackedBarChart, plotNorthEast) {
  return {
    restrict : 'E',
    templateUrl : 'pages/barchart.html',
    replace: true,
    transclude: true,
    scope: {
      parameters : "@",
      chartRenderer : "@"
    },
    link: function(scope, elements, attrs) {
      $log.log("calling link iside the barChart");
      $log.log(scope.chartRenderer);
      var chartMethod = scope.chartRenderer + ".render" + '(elements[0]' +
                        ', ' + elements[0].clientWidth + ', "' + scope.parameters + '")';
      eval(chartMethod);
      // }
    }
  }
}]);
