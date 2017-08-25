
var devices = angular.module('abode.devices');

devices.directive('deviceControls', function () {
  return {
    scope: {
      'name': '@',
      'width': '@',
    },
    restrict: 'E',
    replace: true,
    transclude: false,
    controller: 'deviceControlsCtl',
    templateUrl: 'modules/devices/views/device.controls.html',
  };

});
