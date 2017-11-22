var abodechart = angular.module('abode.chart');

abodechart.controller('abodeChartDatasetCtl', ['$scope', '$timeout', 'Devices', 'Scenes', 'Rooms', function ($scope, $timeout, Devices, Scenes, Rooms) {

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
    var get_history = function () {
      item.$get_history(config.range, $scope.value).then(function (data) {

        // If no data returned, stop processing
        if (data.length === 0) {
          return;
        }
        // Emit our chart data
        $scope.$emit('abode-chart-dataset-updated', {
          index: config.index,
          type: $scope.type,
          name: $scope.name,
          value: $scope.value,
          data: data,
          range: config.range
        });
        
        var last_result_date = new Date(data[data.length -1].x);
        
        // Handle pagination
        console.log(last_result_date, config.range.end, last_result_date < config.range.end)
        if (last_result_date < config.range.end) {
          last_result_date.setSeconds(last_result_date.getSeconds() + 1);
          config.range.start = last_result_date;
          $timeout(get_history, 1000);
        }
      });
    }
    
    get_history();
  });

}]);