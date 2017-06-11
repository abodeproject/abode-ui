angular.module('wunderground', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.wunderground', {
    url: '/wunderground',
    templateUrl: 'modules/wunderground/views/settings.html',
    controller: 'wundergroundSettings',
    resolve: {
      config: function (wunderground) {
        return wunderground.get_config();
      },
      status: function (wunderground) {
        return wunderground.status();
      }
    }
  });
})
.service('wunderground', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('wunderground');

  };

  var save_config = function (config) {

    return settings.save_config('wunderground', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/wunderground').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/wunderground/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/wunderground/disable').value()).then(function (response) {
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

})
.controller('wundergroundSettings', function ($scope, wunderground, abode, config, status) {
  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    wunderground.status().then(function (status) {
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
      wunderground.disable().then(success, failure);
    } else {
      wunderground.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    wunderground.save($scope.config).then(function () {

      abode.message({
        'type': 'success',
        'message': 'Wunderground Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Wunderground Settings Failed to Saved',
        'details': err
      });
    });

  };
})
.controller('wundergroundEdit', function ($scope) {
  $scope.device = $scope.$parent.device;

})
.controller('wundergroundAdd', function ($scope) {
  $scope.device = $scope.$parent.device;
  $scope.device.capabilities = ['weather','temperature_sensor', 'humidity_sensor'];
});
