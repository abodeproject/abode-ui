
var devices = angular.module('abode.devices');

devices.directive('deviceToggle', function () {
  return {
    'restrict': 'E',
    'scope': {
      'onLabel': '@?',
      'onColor': '@?',
      'offLabel': '@?',
      'offColor': '@?',
      'ngModel': '='
    },
    'require': 'ngModel',
    'replace': true,
    'templateUrl': 'modules/devices/views/device_toggle.html',
    'controller': 'deviceToggleCtl',
  };
});