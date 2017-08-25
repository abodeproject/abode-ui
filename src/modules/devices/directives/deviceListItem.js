
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
    },
    'controller': ['$scope', 'abode', function ($scope, abode) {
      var listener = abode.scope.$on('UPDATED', function (event, msg) {
        if (msg.object && msg.object._id !== $scope.ngModel._id) {
          return;
        }

        if (msg.object._on === true) {
          msg.object.age = new Date() - new Date(msg.object.last_on);
        } else {
          msg.object.age = new Date() - new Date(msg.object.last_off);
        }

        if (!isNaN(msg.object.age)) {
          msg.object.age = msg.object.age / 1000;
        } else {
          msg.object.age = 0;
        }

        angular.merge($scope.ngModel, msg.object);

      });

      $scope.$on('$destroy', function () {
        listener();
      });
    }]
  };
});
