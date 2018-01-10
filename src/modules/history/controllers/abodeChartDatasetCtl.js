var abodechart = angular.module('abode.chart');

abodechart.controller('abodeChartDatasetCtl', ['$scope', '$timeout', '$element', 'Devices', 'Scenes', 'Rooms', function ($scope, $timeout, $element, Devices, Scenes, Rooms) {

  var item;
  var element_index = [].slice.call($element[0].parentNode.children).indexOf($element[0]);

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
      index: ($scope.index !== undefined) ? $scope.index : element_index,
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
    var page = 1;
    if (!config) {
      return;
    }
    // If request is not for this dataset, ignore
    if (config.type !== $scope.type || config.name !== $scope.name || config.value !== $scope.value) {
      return;
    }

    // Stop propagation
    event.preventDefault();
    var records = [];

    var get_page = function (page) {
      // Get history data with the splied range and dataset value
      item.$get_history(config.range, $scope.value, page).then(function (data) {

        Array.prototype.push.apply(records, data.records);

        if (data['total-pages'] && parseInt(data['total-pages'], 10) > page) {
          page += 1;
          $timeout(function () {get_page(page)}, 100);
        } else {

          // Emit our chart data
          $scope.$emit('abode-chart-dataset-updated', {
              index: config.index,
              type: $scope.type,
              name: $scope.name,
              value: $scope.value,
              data: records,
              range: config.range
          });
        }
      });
    };

    get_page(page);
  });

}]);