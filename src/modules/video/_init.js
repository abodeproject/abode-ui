angular.module('video', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.video', {
    url: '/video',
    templateUrl: 'modules/video/views/settings.html',
    controller: 'videoSettings',
    resolve: {
      config: function (video) {
        return video.get_config();
      },
      status: function (video) {
        return video.status();
      }
    }
  });
})
.service('video', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('video');

  };

  var save_config = function (config) {

    return settings.save_config('video', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/video').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/video/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/video/disable').value()).then(function (response) {
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
.controller('videoSettings', function ($scope, video, abode, config, status) {

  $scope.config = config;
  $scope.status = status;

  $scope.get_status = function () {
    video.status().then(function (status) {
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
      video.disable().then(success, failure);
    } else {
      video.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    video.save($scope.config).then(function () {
      $scope.status = 'saved';

      abode.message({
        'type': 'success',
        'message': 'Video Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Video Settings Failed to Saved',
        'details': err
      });
    });

  };

})
.controller('videoEdit', function () {
  $scope.device = $scope.$parent.device;
})
.controller('videoAdd', function () {
  $scope.device = $scope.$parent.device;
});
