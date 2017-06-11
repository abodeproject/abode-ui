
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

  $scope.linking = {
    controller: true,
    group: 1
  };

  $scope.db_loading = true;

  insteon.get_scenes().then(function (results) {
    $scope.scenes = results;
  }, function () {
  });

  insteon.modem_get_database().then(function (results) {
    $scope.database = results;
    $scope.db_loading = false;
  }, function () {
    $scope.db_loading = false;
  });

  $scope.get_status = function () {
    insteon.status().then(function (status) {
      $scope.status = status;
      $scope.config.enabled = $scope.status.enabled;
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

    insteon.modem_start_all_linking(controller, group).then(function (device) {
      $scope.link_waiting = false;
      $scope.link_error = false;

      $scope.linking.device = device;
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

  $scope.idrequest = function () {
    $scope.id_success = false;
    $scope.id_error = false;
    $scope.id_loading = true;

    insteon.idrequest($scope.linking.device.config.address).then(function (result) {
      $scope.linking.device.config.device_cat = result.devcat;
      $scope.linking.device.config.device_subcat = result.subcat;
      $scope.linking.device.config.firmware = result.firmware;

      $scope.id_error = false;
      $scope.id_loading = false;
      $scope.id_success = true;

      $timeout(function () {
        $scope.id_success = false;
      }, 5000);
    }, function () {
      $scope.id_error = true;
      $scope.id_loading = false;
      $scope.id_success = false;

      $timeout(function () {
        $scope.id_error = false;
      }, 5000);
    });
  };

  $scope.reload_database = function () {
    $scope.device_db_loading = true;
    $scope.device_db_error = false;
    $http.post(abode.url('/api/insteon/devices/' + $scope.linking.device.config.address + '/load_database').value()).then(function (response) {
      $scope.device_db_loading = false;
      $scope.device_db_error = false;
      $scope.linking.device.config.database = response.data;
    }, function (err) {
      $scope.device_db_loading = false;
      $scope.device_db_error = true;
    });
  };
});
