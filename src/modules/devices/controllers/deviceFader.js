
var devices = angular.module('abode.devices');

devices.controller('deviceFader', ['$scope', '$timeout', 'device', function ($scope, $timeout, device) {
  $scope.device = device;


  $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
  }, 100);
}]);