
var synology = angular.module('synology');

synology.controller('synologySettings', function ($scope, $http, $timeout, synology, abode, status, config) {

  $scope.status = status;
  $scope.enabling = false;
  $scope.config = config;

  $scope.toggle = function () {
    if ($scope.enabling) {
      return;
    }

    $scope.enabling = true;

    var success = function () {
      $scope.enabling = false;

      synology.status().then(function (status) {
        $scope.status = status;
      })
    };

    var failure = function (err) {
      $scope.enabling = false;

      abode.message({
        'type': 'failed',
        'message': err.message
      });
    };

    if (!$scope.status.enabled) {
      synology.enable().then(success, failure);
    } else {
      synology.disable().then(success, failure);
    }

  };

  $scope.refresh = function () {
    if ($scope.loading) {
      return;
    }

    $scope.loading = true;
    $scope.error = false;

    synology.refresh_cameras().then(function (results) {

      $scope.loading = false;
      $scope.error = false;

      $scope.status.cameras = results;
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

  $scope.save = function () {

    synology.save_config($scope.config).then(function () {
      $scope.status = 'saved';

      abode.message({
        'type': 'success',
        'message': 'Synology Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Synology Settings Failed to Saved',
        'details': err
      });
    });
  };

});