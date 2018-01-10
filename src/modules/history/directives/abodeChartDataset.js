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
      index: '@',
      backgroundColor: '@',
      borderColor: '@',
      data: '='
    },
    restrict: 'E',
    reaplce: true,
    controller: 'abodeChartDatasetCtl'
  }
}]);