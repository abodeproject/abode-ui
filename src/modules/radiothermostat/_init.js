angular.module('radiothermostat', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.radiothermostat', {
    url: '/radiothermostat',
    templateUrl: 'modules/radiothermostat/views/settings.html',
    controller: 'radiothermostatSettings',
    resolve: {
      config: function (radiothermostat) {
        return radiothermostat.get_config();
      },
      status: function (radiothermostat) {
        return radiothermostat.status();
      }
    }
  });
})
.service('radiothermostat', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('radiothermostat');

  };

  var save_config = function (config) {

    return settings.save_config('radiothermostat', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/radiothermostat').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/radiothermostat/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/radiothermostat/disable').value()).then(function (response) {
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
.controller('radiothermostatSettings', function ($scope, radiothermostat, abode, config, status) {

  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    radiothermostat.status().then(function (status) {
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
      radiothermostat.disable().then(success, failure);
    } else {
      radiothermostat.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    radiothermostat.save($scope.config).then(function () {
      $scope.status = 'saved';

      abode.message({
        'type': 'success',
        'message': 'Radiothermostat Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Radiothermostat Settings Failed to Saved',
        'details': err
      });
    });

  };

})
.controller('radiothermostatEdit', function () {
  $scope.device = $scope.$parent.device;
})
.controller('radiothermostatAdd', function () {
  $scope.device = $scope.$parent.device;
});
