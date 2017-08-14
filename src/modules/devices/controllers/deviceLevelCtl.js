

var devices = angular.module('abode.devices');

devices.controller('deviceLevelCtl', function ($scope) {
  $scope.ngModel.$temp_level = $scope.ngModel._level;

  $scope.$watch('ngModel._level', function () {
    $scope.ngModel.$temp_level = $scope.ngModel._level;
  });
  $scope.slider = {
      floor: 0,
      ceil: 100,
      hideLimitLabels: true,
      hidePointerLabels: true,
      showSelectionBar: true,
      selectionBarGradient: {
        from: '#d3ab3d',
        to: '#f9f4d6'
      },
      onEnd: function () {
        $scope.ngModel.$set_level($scope.ngModel.$temp_level);
      }
  };
});