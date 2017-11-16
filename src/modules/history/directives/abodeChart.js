var abodechart = angular.module('abode.chart');

abodechart.directive('abodeChart', [function () {
  return {
    scope: {
      start: '@',
      end: '@',
      interval: '@',
      legend: '@',
    },
    restrict: 'E',
    controller: 'abodeChartCtl',
    templateUrl: 'modules/history/views/abode-chart.html',
    transclude: true,
    replace: true
  }
}]);