
var notifications = angular.module('abode.notifications');

notifications.factory('Notifications', ['$resource', '$http', '$q', '$uibModal', 'abode', function ($resource, $http, $q, $uibModal, abode) {

  var model = $resource(abode.url('/api/notifications/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'refresh': { method: 'GET' },
    'active': { method: 'GET', isArray: true, params: {'id': 'active'} },
  });

  model.prototype.$reset = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/reset').value();

    $http.post(url).then(function () {
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$activate = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/activate').value();

    $http.post(url).then(function () {
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$deactivate = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/deactivate').value();

    $http.post(url).then(function () {
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$triggers = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/triggers').value();

    $http.get(url).then(function (results) {
      defer.resolve(results.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$add_trigger = function (trigger) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/triggers').value();

    $http.post(url, {'_id': trigger._id || trigger}).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$remove_trigger = function (trigger) {
    var self = this,
      defer = $q.defer(),
      trigger_id = trigger._id || trigger;
      url = abode.url('/api/notifications/' + this._id + '/triggers/' + trigger_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$add_action = function (action) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/actions').value();

    $http.post(url, action).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$remove_action = function (action) {
    var self = this,
      defer = $q.defer(),
      action_id = action._id || action;
      url = abode.url('/api/notifications/' + this._id + '/actions/' + action_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;

}]);
