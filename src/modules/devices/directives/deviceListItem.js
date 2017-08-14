
var devices = angular.module('abode.devices');

devices.directive('deviceListItem', function () {
  return {
    'restrict': 'E',
    'require': 'ngModel',
    'replace': true,
    'templateUrl': 'modules/devices/views/device_list_item.html',
    'scope': {
      'ngModel': '=',
      'showControls': '@?'
    }
  };
});