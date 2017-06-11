var lutroncaseta = angular.module('lutroncaseta', []);

lutroncaseta.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.lutroncaseta', {
    url: '/lutroncaseta',
    templateUrl: 'modules/lutroncaseta/views/settings.html',
    controller: 'lutroncasetaSettings',
    resolve: {
      config: function (lutroncaseta) {
        return lutroncaseta.get_config();
      },
      status: function (lutroncaseta) {
        return lutroncaseta.status();
      }
    }
  });
});

lutroncaseta.service('lutroncaseta', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('lutroncaseta');

  };

  var save_config = function (config) {

    return settings.save_config('lutroncaseta', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/lutroncaseta').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/lutroncaseta/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/lutroncaseta/disable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  return {
    get_config: get_config,
    save: save_config,
    status: status,
    enable: enable,
    disable: disable
  };

});

lutroncaseta.controller('lutroncasetaSettings', function ($scope, lutroncaseta, abode, config, status) {
  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    lutroncaseta.status().then(function (status) {
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

      abode.message({
        'type': 'failed',
        'message': err.data.message,
        'details': err
      });
    };

    if ($scope.status.enabled) {
      lutroncaseta.disable().then(success, failure);
    } else {
      lutroncaseta.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    lutroncaseta.save($scope.config).then(function () {

      abode.message({
        'type': 'success',
        'message': 'Lutron Caseta Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Lutron Caseta Settings Failed to Saved',
        'details': err
      });
    });

  };
});

lutroncaseta.controller('lutroncasetaEdit', function ($scope) {
  $scope.device = $scope.$parent.device;

});

lutroncaseta.controller('lutroncasetaAdd', function ($scope) {
  $scope.device = $scope.$parent.device;
  $scope.device.capabilities = ['weather','temperature_sensor', 'humidity_sensor'];
});
