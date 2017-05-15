
var devices = angular.module('abode.devices');

devices.controller('devicesList', function ($scope, $state, Devices) {
  $scope.devices = [];
  $scope.loading = true;

  $scope.view = function (device) {
    device.$open();
  };

  $scope.edit = function (device) {
    $state.go('main.devices.edit', {'name': device.name});
  };

  $scope.load = function () {
    Devices.query().$promise.then(function (results) {
      $scope.devices = results;
      $scope.loading = false;
      $scope.error = false;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.has_capability = function (device, cap) {
    return (device.capabilities.indexOf(cap) !== -1);
  };

  $scope.load();
});
