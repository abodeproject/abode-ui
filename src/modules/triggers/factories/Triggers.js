
var triggers = angular.module('abode.triggers');

triggers.factory('Triggers', ['$resource', '$http', '$q', '$uibModal', 'abode', function ($resource, $http, $q, $uibModal, abode) {

  var model = $resource(abode.url('/api/triggers/:id'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'refresh': { method: 'GET' },
  });

  model.prototype.$check = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/triggers/' + this._id + '/check').value();

    $http.post(url).then(function (results) {
      defer.resolve(results.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$notifications = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/triggers/' + this._id + '/notifications').value();

    $http.get(url).then(function (results) {
      defer.resolve(results.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$add_notification = function (notification) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/triggers/' + this._id + '/notifications').value();

    $http.post(url, {'_id': notification._id || notification}).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$remove_notification = function (notification) {
    var self = this,
      defer = $q.defer(),
      notification_id = notification._id || notification;
      url = abode.url('/api/triggers/' + this._id + '/notifications/' + notification_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;

}]);
