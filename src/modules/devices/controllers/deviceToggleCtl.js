

var devices = angular.module('abode.devices');

devices.controller('deviceToggleCtl', function ($scope, $timeout) {
  $scope.ngModel.$temp_level = $scope.ngModel._level;
  $scope.onLabel = $scope.onLabel || 'On';
  $scope.onColor = $scope.onColor || '#4baf4d';
  $scope.offLabel = $scope.offLabel || 'Off';
  $scope.offColor = $scope.offColor || '#ddd';
  $scope.label = ($scope.ngModel._on) ? $scope.onLabel : $scope.offLabel;
  $scope.state = false;

  $scope.styles = {
    'background-color': ($scope.ngModel._on) ? $scope.onColor : $scope.offColor
  };

  var set_state = function () {

    if ($scope.ngModel.$is('motion_sensor')) {
      $scope.state = ($scope.ngModel._motion);
      $scope.label = ($scope.ngModel._motion) ? $scope.onLabel : $scope.offLabel;

      $scope.styles = {
        'background-color': ($scope.ngModel._motion) ? $scope.onColor : $scope.offColor
      };

      return;
    }

    $scope.state = ($scope.ngModel._on);

    if ($scope.ngModel._level > 0 && $scope.ngModel._level < 100) {
      $scope.label = $scope.ngModel._level;
    } else {
      $scope.label = ($scope.ngModel._on) ? $scope.onLabel : $scope.offLabel;
    }

    $scope.styles = {
      'background-color': ($scope.ngModel._on) ? $scope.onColor : $scope.offColor
    };
  };

  $scope.toggle = function () {
    if ($scope.waiting) {
      return;
    }

    if ($scope.ngModel.$is('motion_sensor')) {
      if ($scope.ngModel._motion) {
        $scope.ngModel.$motion_off();
      } else {
        $scope.ngModel.$motion_on();
      }
    } else {
      if ($scope.ngModel._on) {
        $scope.ngModel.$off();
      } else {
        $scope.ngModel.$on();
      }
    }

  };

  set_state();

  $scope.$watch('ngModel._level', set_state);
  $scope.$watch('ngModel._on', set_state);
  $scope.$watch('ngModel._motion', set_state);
});
