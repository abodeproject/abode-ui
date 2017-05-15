
var welcome = angular.module('abode.welcome');

welcome.controller('welcomeDevicesController', ['$scope', '$timeout', '$http', '$q', '$state', 'abode', 'AuthDevices', 'Auth', 'rad', function ($scope, $timeout, $http, $q, $state, abode, AuthDevices, Auth, rad) {

  abode.load();
  $scope.config = abode.config;
  $scope.loading = false;
  $scope.failed = false;
  $scope.interfaces = [];
  $scope.state = $state;
  $scope.rad = rad;

  $scope.add_rad = ($scope.rad && ($scope.rad.mode === 'device' || $scope.rad.mode === 'server')) ? true : false;

  $scope.device = new AuthDevices({'capabilities': ['client', 'browser'], 'provider': 'browser'});
  $scope.auth = new Auth(abode.config.auth);

  $scope.default_devices = [
    'Living Room Controller',
    'Living Room Clock',
    'Bedroom Controller',
    'Bedroom Clock',
    'Entry',
    'Phone',
    'Tablet',
    'Laptop',
    'Computer',
    'Dev Display',
  ];

  $scope.reset_server = function () {
    abode.save({});
    $state.go('welcome');
  };

  $scope.deviceFilter = function () {
    return function( item ) {
      if ($scope.add_rad) {
        return (item.provider === 'rad');
      } else {
        return (item.provider === 'browser');
      }
    };
  };

  $scope.load_devices = function () {
    $scope.loading = true;
    $scope.devices = [];

    AuthDevices.query().$promise.then(function (results) {
      $scope.devices = results;
      $scope.loading = false;
      $scope.failed = false;
    }, function (err) {
      $scope.loading = false;
      $scope.failed = true;
      console.error(err);
    });

  };

  $scope.save_token = function (token) {
    $http.put('/api/abode/config', {'server_token': token, 'server_url': abode.config.server, 'client_token': abode.config.auth.token.client_token, 'auth_token': abode.config.auth.token.auth_token}).then(function () {
      $http.post('/api/abode/save').then(function () {
        $state.go('welcome_interfaces');
      }, function (err) {
        console.dir(err);
      });
    }, function (err) {
        console.dir(err);
    });
  };

  $scope.select = function (device) {
    if ($scope.add_rad) {
      device.capabilities.push.apply(device.capabilities, rad.capabilities);
      device.config = device.config || {};
      device.config.address = rad.url;
    }

    $scope.auth.$assign(device).then(function (result) {
      if (result.token) {
        $scope.save_token(result.token);
      } else {
        $state.go('welcome_interfaces');
      }
    }, function (err) {
      abode.message({'message': err.message || 'Error Occured', 'type': 'failed'});
    });

    //$state.go('main.home', {'interface': interface});
  };

  $scope.create = function () {
    if ($scope.add_rad) {
      $scope.device.provider = 'rad';
      $scope.device.capabilities.push.apply($scope.device.capabilities, rad.capabilities);
      $scope.device.config = $scope.device.config || {};
      $scope.device.config.address = rad.url;
    } else {
      $scope.device.capabilities = ['client', 'browser'];
      $scope.device.provider = 'browser';
      $scope.device.config = {};
    }

    $scope.device.$save().then(function (data) {
      if (data.token) {
        $scope.save_token(data.token);
      } else {
        $state.go('welcome_interfaces');
      }
    }, function (err) {
      abode.message({'message': err.data.message || err.data.errmsg || err.data, 'type': 'failed'});
    });
  };

  $timeout($scope.load_devices, 100);

}]);
