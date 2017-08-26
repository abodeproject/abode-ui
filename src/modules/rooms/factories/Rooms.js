
var rooms = angular.module('abode.rooms');

rooms.factory('Rooms', ['$resource', '$q', '$http', '$state', 'abode', 'rooms', 'RoomDevices', 'RoomScenes', function ($resource, $q, $http, $state, abode, rooms, RoomDevices, RoomScenes) {

  var Rooms = $resource(abode.url('/api/rooms/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
  });


  Rooms.prototype.$edit = function () {

    $state.go('main.rooms.edit', {'name': this.name});
  };

  Rooms.prototype.$open = function (controls) {
    var self = this;

    self.$is_open = true;

    var modal = rooms.view(self, undefined, undefined, controls)

    modal.result.then(function () {
      self.$is_open = false;
    }, function () {
      self.$is_open = false;
    });

    return modal;
  };

  Rooms.prototype.$refresh = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/rooms/' + this._id + '/status').value();

    $http.get(url).then(function (response) {
      for (var key in response.data.room) {
        if (response.data.room.hasOwnProperty(key)) {
          self[key] = response.data.room[key];
        }
      }
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$devices = function () {
    return RoomDevices.query({'room': this.name});
  };

  Rooms.prototype.$scenes = function () {
    return RoomScenes.query({'room': this.name});
  };

  Rooms.prototype.$on = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/rooms/' + this._id + '/on').value();

    $http.post(url).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$off = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/rooms/' + this._id + '/off').value();

    $http.post(url).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$addDevice = function (device) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/rooms/' + this._id + '/devices').value();

    $http.post(url, {'_id': device._id || device}).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$removeDevice = function (device) {
    var self = this,
      defer = $q.defer(),
      device_id = device._id || device;
      url = abode.url('/api/rooms/' + this._id + '/devices/' + device_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$addScene = function (scene) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/rooms/' + this._id + '/scenes').value();

    $http.post(url, {'_id': scene._id || scene}).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Rooms.prototype.$removeScene = function (scene) {
    var self = this,
      defer = $q.defer(),
      scene_id = scene._id || scene;
      url = abode.url('/api/rooms/' + this._id + '/scenes/' + scene_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return Rooms;
}]);
