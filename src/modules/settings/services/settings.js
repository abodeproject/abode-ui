
var settings = angular.module('abode.settings');

settings.service('settings', function ($q, $http, $templateCache, abode) {

  var get_sources = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/sources').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_source = function (name) {
    var defer = $q.defer();

    $http.get(abode.url('/api/sources/' + name).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_source = function (source) {
    var defer = $q.defer();

    $http.put(abode.url('/api/sources/' + source._id).value(), source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var add_source = function (source) {
    var defer = $q.defer();

    $http.post(abode.url('/api/sources/'), source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var remove_source = function (source) {
    var defer = $q.defer();

    $http.delete(abode.url('/api/sources/' + source._id).value()).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var get_config = function (provider) {
    var defer = $q.defer();

    var url = (provider) ? '/api/abode/config/' + provider : '/api/abode/config';

    $http.get(abode.url(url).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_config = function (provider, config) {
    var defer = $q.defer();


    var url = (provider) ? '/api/abode/config/' + provider : '/api/abode/config';

    $http.put(url, config).then(function (response) {
      write_config().then(function (response) {
        defer.resolve(response);
      }, function (err) {
        defer.reject(err);
      });
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var write_config = function () {
    var defer = $q.defer();

    $http.post('/api/abode/save').then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_view = function () {
    var defer = $q.defer();

    $http.get('/api/abode/views/home.html').then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_view = function (view) {
    var defer = $q.defer();

    $http.put('/api/abode/views/home.html', view, {headers: {'Content-Type': 'text/plain'}}).then(function (response) {
      $templateCache.put('/api/abode/views/home.html', view);
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  return {
    get_config: get_config,
    save_config: save_config,
    write_config: write_config,
    get_view: get_view,
    save_view: save_view,
    get_sources: get_sources,
    get_source: get_source,
    save_source: save_source,
    add_source: add_source,
    remove_source: remove_source,
  };

});
