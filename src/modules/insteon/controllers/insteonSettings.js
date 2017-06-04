
var insteon = angular.module('insteon');

insteon.controller('insteonSettings', function ($scope, $http, $timeout, insteon, abode, status) {

  $scope.enabling = false;
  $scope.status = status;
  $scope.config = status.config;
  $scope.devices = [
    '/dev/ttyUSB0',
    '/dev/ttyUSB1',
    '/dev/ttyUSB2',
    '/dev/ttyUSB3',
  ];

  $scope.db_loading = true;

  insteon.modem_get_database().then(function (results) {
    $scope.database = results;
    $scope.db_loading = false;
  }, function () {
    $scope.db_loading = false;
  });

  $scope.get_status = function () {
    insteon.status().then(function (status) {
      $scope.status = status;
    });
  };

  $scope.toggle = function () {
    $scope.enabling = true;

    var success = function () {
      $scope.enabling = false;
      $scope.error = '';

      $scope.get_status();
    };

    var failure = function (err) {
      $scope.enabling = false;
      $scope.error = err.data.message;
      $scope.get_status();
    };

    if ($scope.status.enabled) {
      insteon.disable().then(success, failure);
    } else {
      insteon.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    insteon.save($scope.config).then(function () {
      $scope.status = 'saved';

      abode.message({
        'type': 'success',
        'message': 'Insteon Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Insteon Settings Failed to Saved',
        'details': err
      });
    });

  };

  $scope.start_linking = function (controller, group) {
    $scope.link_waiting = true;
    $scope.link_error = false;

    insteon.modem_start_all_linking(controller, group).then(function () {
      $scope.link_waiting = false;
      $scope.link_error = false;
    }, function (err) {
      $scope.link_waiting = false;
      $scope.link_error = true;

      $timeout(function () {
        $scope.link_error = false;
      }, 2000);

      abode.message({
        'type': 'failed',
        'message': 'Failed to enter linking',
        'details': err
      });
    });
  };

  $scope.cancel_linking = function (controller, group) {

    insteon.modem_cancel_all_linking().then(function () {
      $scope.link_waiting = false;
      $scope.link_error = false;
    }, function (err) {
      $scope.link_waiting = false;
      $scope.link_error = true;

      $timeout(function () {
        $scope.link_error = false;
        $scope.link_waiting = true;
      }, 1000);

      abode.message({
        'type': 'failed',
        'message': 'Failed to cancel linking',
        'details': err
      });
    });
  };

  $scope.load_modem_database = function () {
    $scope.db_loading = true;
    $scope.db_error = false;
    insteon.modem_load_database().then(function (results) {
      $scope.db_loading = false;
      $scope.db_error = false;
      $scope.database = results;
    }, function (err) {
      $scope.db_loading = false;
      $scope.db_error = true;

      $timeout(function () {
        $scope.db_error = false;
      }, 2000);

      abode.message({
        'type': 'failed',
        'message': 'Failed to load database',
        'details': err
      });
    });
  };
});
