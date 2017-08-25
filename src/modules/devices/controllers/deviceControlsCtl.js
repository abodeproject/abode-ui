
var devices = angular.module('abode.devices');

devices.controller('deviceControlsCtl', ['$scope', '$timeout','abode', 'Devices', function ($scope, $timeout, abode, Devices) {
  var listener;

  $scope.loading = false;
  $scope.capabilities = [];
  $scope.controls = [];
  $scope.styles = {
    'width': ($scope.width || 14) + 'em'
  };

  //If we get an EVENTS_RESET event, schedule a refresh
  var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
    listener();

    $scope.load_device();
  });

  var load_device = function () {
    $scope.loading = true;
    Devices.get({'id': $scope.name}).$promise.then(function (device) {
      $scope.device = device;

      $scope.capabilities = angular.copy($scope.device.capabilities).map(function (c) {
        return {
          'name': c,
          'view': 'modules/devices/views/capabilities/' + c + '.html'
        };
      });

      $scope.controls = $scope.capabilities.filter(function (c) {

        return (c.name.indexOf('_sensor') === -1);

      });

      $scope.sensors = $scope.capabilities.filter(function (c) {

        return (c.name.indexOf('_sensor') > -1);

      });

      listener = abode.scope.$on('UPDATED', function (event, msg) {
        if (msg.object && msg.object._id !== $scope.device._id) {
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

        angular.merge($scope.device, msg.object);

      });

      $scope.loading = false;

    });
  };

  $scope.set_mode = function (mode) {

    console.dir($scope.device.$set_mode);
    $scope.processing = true;
    $scope.errors = false;

    $scope.device.$set_mode(mode).then(function () {
      $scope.processing = false;
      $scope.errors = false;
    }, function (err) {
      console.log(err);
      $scope.processing = false;
      $scope.errors = true;
    });
  };


  $scope.temp_up = function () {
    $scope.processing = true;
    $scope.errors = false;
    if (temp_wait) {
      $timeout.cancel(temp_wait);
    }
    $scope.device._set_point += 1;

    temp_wait = $timeout($scope.set_temp, 2000);
  };

  $scope.temp_down = function () {
    $scope.processing = true;
    $scope.errors = false;
    if (temp_wait) {
      $timeout.cancel(temp_wait);
    }
    $scope.device._set_point -= 1;

    temp_wait = $timeout($scope.set_temp, 2000);
  };

  $scope.set_temp = function () {

    $scope.processing = true;
    $scope.errors = false;

    $scope.device.$set_temp($scope.device._set_point).then(function () {
    //$http.post(source_uri + '/devices/' + $scope.device.name + '/set_point', [$scope.device._set_point]).then(function (response) {
      temp_wait = undefined;
      $scope.processing = false;
      $scope.errors = false;
    }, function () {
      temp_wait = undefined;
      $scope.processing = false;
      $scope.errors = true;
    });
  };

  $timeout(load_device, 0);

  $scope.$on('$destroy', function () {
    listener();
    feed_detector();
  });
}]);
