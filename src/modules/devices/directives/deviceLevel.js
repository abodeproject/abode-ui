
var devices = angular.module('abode.devices');

devices.directive('deviceLevel', function () {
  return {
    'restrict': 'E',
    'require': 'ngModel',
    'replace': true,
    'templateUrl': 'modules/devices/views/device_level.html',
    'controller': 'deviceLevelCtl',
    'scope': {
      'ngModel': '='
    }
  };
})