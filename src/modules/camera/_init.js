angular.module('camera', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.camera', {
    url: '/camera',
    templateUrl: 'modules/camera/views/settings.html',
    controller: 'cameraSettings',
    resolve: {
      config: function (camera) {
        return camera.get_config();
      },
      status: function (camera) {
        return camera.status();
      }
    }
  });
})
.service('camera', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('camera');

  };

  var save_config = function (config) {

    return settings.save_config('camera', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/cameras').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/cameras/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/cameras/disable').value()).then(function (response) {
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
.controller('cameraSettings', function ($scope, camera, abode, config, status) {
  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    camera.status().then(function (status) {
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
      camera.disable().then(success, failure);
    } else {
      camera.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    camera.save($scope.config).then(function () {

      abode.message({
        'type': 'success',
        'message': 'Camera Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Camera Settings Failed to Saved',
        'details': err
      });
    });

  };
})
.controller('cameraEdit', function ($scope) {
  $scope.device = $scope.$parent.device;

})
.controller('cameraAdd', function ($scope) {
  $scope.device = $scope.$parent.device;
  $scope.device.capabilities = ['camera'];
  $scope.device.active = true;
});
