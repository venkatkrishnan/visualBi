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
    link: function($scope, $element, $attr) {

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

      $http.get('chartData/widgets').success(function(widgets) {
        $scope.widgetItems = widgets;

        $scope.widget = function(widgetId) {

          widgets.forEach(function(w) {
             if(w.widgetId === widgetId) {
                $scope.title = w.title;
                $scope.chartRenderer = w.chartRenderer;
                $scope.url = w.url;
                $scope.comments = w.comments;
             }
          })
        }
      });
    }
  };
}).directive("barChart", ['$log', 'plotContinentChart', 'gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotNorthEast', function($log,
                                                                    plotContinentChart, gdpPerCapitaBarChart, gdpStackedBarChart, plotNorthEast) {
  return {
    restrict : 'E',
    templateUrl : 'pages/barchart.html',
    replace: true,
    scope: {
      parameters : "@",
      chartRenderer : "@",
      tabs : "="
    },
    link: function(scope, elements, attrs) {

      // if(parseInt(elements[0].clientWidth) === 0) {
      //   var myWatcher = scope.$watch(function() {
  	  //     return elements[0].clientWidth;
      //   }, function(value){
	    //     if(value > 0) {
      //       var chartMethod = scope.chartRenderer + ".render" + '(elements[0]' +
      //                           ', ' + value + ', "' + scope.parameters + '")';
      //
      //       eval(chartMethod).then(function(data) {
      //         myWatcher();
      //       });
      //     }
      //   });
      // } else {

      var chartMethod = scope.chartRenderer + ".render" + '(elements[0]' +
                        ', ' + elements[0].clientWidth + ', "' + scope.parameters + '")';
      eval(chartMethod);
      // }
    }
  }
}]);
