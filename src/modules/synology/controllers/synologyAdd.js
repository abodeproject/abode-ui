
var synology = angular.module('synology');

synology.controller('synologyAdd', function ($scope, $http, $timeout, synology, abode) {

  $scope.device = $scope.$parent.device;
  $scope.loading = false;
  $scope.cameras = [];

  $scope.refresh = function () {
    if ($scope.loading) {
      return;
    }

    $scope.loading = true;
    $scope.error = false;

    synology.refresh_cameras().then(function (results) {

      $scope.loading = false;
      $scope.error = false;

      $scope.cameras = results;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;

      $timeout(function () {
        $scope.error = false;
      }, 1500);

      abode.message({
        'type': 'failed',
        'message': err.message || 'Failed to refresh cameras'
      });
    });
  };

  $scope.select = function (camera) {
    $scope.device.name = camera.name;
    $scope.device.active = true;
    $scope.device.capabilities = [
      'camera',
      'motion_sensor'
    ];
    $scope.device.config = camera;
    $scope.device.icon = 'icon-cctv';
  };

  $scope.refresh();
});