
var devices = angular.module('abode.devices');

devices.factory('DeviceRooms', ['$resource', 'abode', function ($resource, abode) {
  'use strict';

  var model = $resource(abode.url('/api/devices/:device/rooms/:id'), {id: '@_id'}, {
    'query': {
      isArray: true,
    }
  });

  //angular.merge(model.prototype, rooms.methods);

  return model;

}]);
