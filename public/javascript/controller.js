var visualApp = angular.module('visualApp', ['ngRoute', 'ui.bootstrap', 'MyApp']);

visualApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'pages/home.html'
    });
}]);

visualApp.directive("tabsData", function($rootScope, $http) {
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
});

visualApp.directive("dashboardData", function($rootScope, $http, $log, ChartService) {
  return {
    restrict : 'E',
    templateUrl : 'pages/dashboard.html',
    controller: function() {

      $http.get('/dashboards').success(function(json) {
        $rootScope.dashboardItems = json;
        $rootScope.currentTab = json[0].tabId;

        $rootScope.onClickTab = function (tab) {
            $rootScope.currentTab = tab.tabId;
        }

        $rootScope.isActiveTab = function(tabId) {
            return tabId == $rootScope.currentTab;
        }
      });

      $http.get('chartData/widgets').success(function(widgets) {
        $rootScope.widgetItems = widgets;

        $rootScope.widget = function(widgetId, widgetContainer) {
          widgets.forEach(function(w) {
             if(w.widgetId === widgetId) {
                $rootScope.title = w.title;
                $rootScope.chartRenderer = w.chartRenderer;
                $rootScope.url = w.url;
                $rootScope.comments = w.comments;

                var containerWidth = $("dashboardData").clientWidth;
                $log.log(containerWidth);
                // var widgetWidth = $("#"+widgetContainer).width();
                //
                // if(widgetWidth > 100) {
                //   var width = $("#"+widgetContainer).width();
                //   var parentWidth = $("#" + widgetContainer).offsetParent().width();
                //   widgetWidth = (width * 100)/parentWidth;
                // }
                // var chartWidth = (containerWidth * widgetWidth)/100;
                // ChartService[$rootScope.chartRenderer]("#" + widgetContainer, chartWidth, $rootScope.url);
             }
          })
        }
      });
    }
  };
});
