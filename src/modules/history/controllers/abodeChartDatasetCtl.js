var abodechart = angular.module('abode.chart');

abodechart.controller('abodeChartDatasetCtl', ['$scope', 'Devices', 'Scenes', 'Rooms', function ($scope, Devices, Scenes, Rooms) {

  var item;

  var types = {
      'device': Devices,
      'room': Rooms,
      'scene': Scenes
  }
  //TODO: Support passing in a room
  types[$scope.type].get({'id': $scope.name}).$promise.then(function (result) {
    item = result;

    // Register the dataset with the chart
    $scope.$emit('abode-chart-register-dataset', {
      type: $scope.type,
      name: $scope.name,
      value: $scope.value,
      label: $scope.label,
      chart: $scope.chart,
      color: $scope.color,
      borderColor: $scope.borderColor,
      backgroundColor: $scope.backgroundColor
    });
  });

  // Listen for events requesting data
  $scope.$on('abode-chart-request-dataset', function (event, config) {
    // If request is not for this dataset, ignore
    if (config.type !== $scope.type || config.name !== $scope.name || config.value !== $scope.value) {
      return;
    }

    // Stop propagation
    event.preventDefault();

    // Get history data with the splied range and dataset value
    item.$get_history(config.range, $scope.value).then(function (data) {

      // Emit our chart data
      $scope.$emit('abode-chart-dataset-updated', {
        index: config.index,
        type: $scope.type,
        name: $scope.name,
        value: $scope.value,
        data: data,
        range: config.range
      });
    })
  });

}]);