var abodechart = angular.module('abode.chart');

abodechart.directive('abodeChartDataset', [function () {
  return {
    scope: {
      type: '@',
      name: '@',
      value: '@',
      label: '@',
      chart: '@',
      color: '@',
      backgroundColor: '@',
      borderColor: '@',
      data: '='
    },
    restrict: 'E',
    reaplce: true,
    controller: 'abodeChartDatasetCtl'
  }
}]);