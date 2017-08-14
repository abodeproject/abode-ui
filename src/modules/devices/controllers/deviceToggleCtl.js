

var devices = angular.module('abode.devices');

devices.controller('deviceToggleCtl', function ($scope, $timeout) {
  $scope.ngModel.$temp_level = $scope.ngModel._level;
  $scope.onLabel = $scope.onLabel || 'On';
  $scope.onColor = $scope.onColor || '#4baf4d';
  $scope.offLabel = $scope.offLabel || 'Off';
  $scope.offColor = $scope.offColor || '#ddd';
  $scope.label = ($scope.ngModel._on) ? $scope.onLabel : $scope.offLabel;

  $scope.styles = {
    'background-color': ($scope.ngModel._on) ? $scope.onColor : $scope.offColor
  };
  $scope.toggle = function () {
    if ($scope.waiting) {
      return;
    }

    if ($scope.ngModel._on) {
      $scope.ngModel.$off();
    } else {
      $scope.ngModel.$on();
    }

  };

  $scope.$watch('ngModel._level', function () {
    if ($scope.ngModel._level > 0 && $scope.ngModel._level < 100) {
      $scope.label = $scope.ngModel._level;
    } else {
      $scope.label = ($scope.ngModel._on) ? $scope.onLabel : $scope.offLabel;
    }

    $scope.styles = {
      'background-color': ($scope.ngModel._on) ? $scope.onColor : $scope.offColor
    };
  });
});