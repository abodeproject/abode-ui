
var insteon = angular.module('insteon');

insteon.controller('insteonAdd', function ($scope, $http, $timeout, abode) {
  $scope.device = $scope.$parent.device;
  $scope.link_status = 'idle';
  $scope.device_types = [
    {
      'name': 'Dimmable Light',
      'capabilities': ['light', 'dimmer'],
      'controller': true,
      'active': true,
    },
    {
      'name': 'On/Off Switch',
      'capabilities': ['light', 'onoff'],
      'controller': true,
      'active': true,
    },
    {
      'name': 'Door Sensor',
      'capabilities': ['door', 'onoff', 'battery_sensor'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Window Sensor',
      'capabilities': ['window', 'onoff', 'battery_sensor'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Motion Sensor',
      'capabilities': ['motion_sensor', 'battery_sensor'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Scene',
      'capabilities': ['onoff', 'scene'],
      'active': true,
    }
  ];

  $scope.changeType = function (t) {
    $scope.type = t;
    $scope.device.capabilities = t.capabilities;
    $scope.device.active = t.active;
  };

  $scope.get_last = function () {
    $http.get(abode.url('/api/insteon/linking/last').value()).then(function (response) {
      $scope.device.config = response.data;
      $scope.link_status = 'idle';
    }, function (err) {
      $scope.error = err;
    });
  };
  $scope.check_linking = function () {
    $http.get(abode.url('/api/insteon').value()).then(function (response) {
      if (!response.data.linking) {
        $scope.link_status = 'idle';
        if (response.data.last_linked) {
          $scope.device.config = response.data.last_linked;
        }

      } else {
        $timeout($scope.check_linking, 2000);
      }
    }, function (err) {
      $scope.error = err;
    });
  };

  $scope.start_linking = function () {
    $scope.link_status = 'linking';

    $http.post(abode.url('/api/insteon/start_all_linking').value(), {'controller': $scope.type.controller}).then(function (response) {
      $timeout($scope.check_linking, 2000);
    }, function (err) {
      $scope.error = err;
      $scope.link_status = 'idle';
    });

  };

  $scope.cancel_linking = function () {

    $http.post(abode.url('/api/insteon/cancel_all_linking').value()).then(function (response) {
      $scope.link_status = 'idle';
    }, function (err) {
      $scope.link_status = 'linking';
    });

  };

});
