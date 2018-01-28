var mqtt = angular.module('mqtt', []);
mqtt.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.mqtt', {
    url: '/mqtt',
    templateUrl: 'modules/mqtt/views/settings.html',
    controller: 'mqttSettings',
    resolve: {
      config: function (mqtt) {
        return mqtt.get_config();
      },
      status: function (mqtt) {
        return mqtt.status();
      }
    }
  });
});

mqtt.service('mqtt', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('mqtt');

  };

  var save_config = function (config) {

    return settings.save_config('mqtt', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/mqtt').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/mqtt/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/mqtt/disable').value()).then(function (response) {
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

mqtt.controller('mqttSettings', function ($scope, mqtt, abode, config, status) {
  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    mqtt.status().then(function (status) {
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
      mqtt.disable().then(success, failure);
    } else {
      mqtt.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    mqtt.save($scope.config).then(function () {

      abode.message({
        'type': 'success',
        'message': 'MQTT Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'MQTT Settings Failed to Saved',
        'details': err
      });
    });

  };
});

mqtt.controller('mqttEdit', function ($scope) {
  $scope.device = $scope.$parent.device;
  $scope.parsers = [
    {'name': 'Sensor', 'value': 'sensor'},
    {'name': 'WeeWx', 'value': 'weewx'}
  ];

});

mqtt.controller('mqttAdd', function ($scope) {
  $scope.device = $scope.$parent.device;
  $scope.parsers = [
    {'name': 'Sensor', 'value': 'sensor'},
    {'name': 'WeeWx', 'value': 'weewx'}
  ];
});
