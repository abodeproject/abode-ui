
var devices = angular.module('abode.devices');

devices.directive('device', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {      device: '@'
    },
    controller: function ($scope, device) {

      $scope.device = device.get($scope.device);

    },
    template: '<div>{{device.name}}</div>',
    replace: true,
  };

});
