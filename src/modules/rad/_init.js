var rad = angular.module('rad', []);

rad.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.rad', {
    url: '/rad',
    templateUrl: 'modules/rad/views/settings.html',
    controller: 'radSettings',
    resolve: {
      config: function (rad) {
        return rad.get_config();
      },
      status: function (rad) {
        return rad.status();
      }
    }
  });
});

rad.service('rad', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('rad');

  };

  var save_config = function (config) {

    return settings.save_config('rad', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/rad').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/rad/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/rad/disable').value()).then(function (response) {
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

rad.controller('radSettings', function ($scope, abode, rad, config, status) {

  $scope.status = status;
  $scope.config = config;

  $scope.get_status = function () {
    rad.status().then(function (status) {
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
      rad.disable().then(success, failure);
    } else {
      rad.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    rad.save($scope.config).then(function () {
      $scope.status = 'saved';

      notifier.notify({
        'status': 'success',
        'message': 'Rad Settings Saved'
      });

    }, function (err) {
      notifier.notify({
        'status': 'failed',
        'message': 'Rad Settings Failed to Saved',
        'details': err
      });
    });

  };

});

rad.controller('radEdit', ['$scope', function ($scope) {
  $scope.dht_sensors = ['', 'DHT11', 'DHT22', 'AM2302'];
  $scope.device = $scope.$parent.device;
}]);

rad.controller('radAdd', ['$scope', '$http', '$timeout', 'abode', function ($scope, $http, $timeout, abode) {
  $scope.loading = true;
  $scope.error = false;
  $scope.detected = [];
  $scope.connecting = false;

  $scope.device = $scope.$parent.device;

  $scope.load = function () {
    $http.get(abode.url('/api/abode/detect_devices').value()).then(function (response) {
      $scope.loading = false;
      $scope.error = false;
      $scope.detected = response.data;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.connect = function (device) {
    $scope.connecting = true;
    $scope.loading = true;
    $http.get(device.url + '/api/abode/status').then(function (response) {
      $scope.loading = false;
      $scope.error = false;
      $scope.device.name = response.data.name;
      $scope.device.config = {
        'address': response.data.url
      };
      $scope.device.capabilities = response.data.capabilities;
      console.log(response.data);
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $timeout($scope.load, 100);
}]);
