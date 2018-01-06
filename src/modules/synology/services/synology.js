
var synology = angular.module('synology');

synology.service('synology', function ($http, $q, $timeout, abode, settings) {

  var getStatus = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/synology').value()).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject({'message': err.data.message || 'Failed to Enable Synology'});
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/synology/enable').value()).then(function () {
      defer.resolve();
    }, function (err) {
      defer.reject({'message': err.data.message || 'Failed to Enable Synology'});
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/synology/disable').value()).then(function () {
      defer.resolve();
    }, function (err) {
      defer.reject({'message': err.data.message || 'Failed to disable Synology'});
    });

    return defer.promise;
  };

  var get_config = function () {

    return settings.get_config('synology');

  };

  var save_config = function (config) {

    return settings.save_config('synology', config);

  };

  var refresh_cameras = function (config) {
    var defer = $q.defer();

    $http.post(abode.url('/api/synology/refresh').value()).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject({'message': err.data.message || 'Failed to get Synology Cameras'});
    });

    return defer.promise;
  };

  return {
    'status': getStatus,
    'enable': enable,
    'disable': disable,
    'get_config': get_config,
    'save_config': save_config,
    'refresh_cameras': refresh_cameras,
  }
});