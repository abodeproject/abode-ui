var devices = angular.module('abode.devices');

devices.factory('RoomDevices', ['$resource', 'abode', 'devices', function ($resource, abode, devices) {
  'use strict';

  var model = $resource(abode.url('/api/rooms/:room/devices/:id'), {id: '@_id'}, {
    'query': {
      isArray: true,
      transformResponse: [
        function (data) {
          data = angular.fromJson(data);

          data.forEach(function (dev) {
            if (dev.capabilities.indexOf('motion_sensor') > -1 && dev._motion) {
              dev.age = new Date() - new Date(dev.last_on);
            } else if (dev.capabilities.indexOf('motion_sensor') === -1 && dev._on === true) {
              dev.age = new Date() - new Date(dev.last_on);
            } else {
              dev.age = new Date() - new Date(dev.last_off);
            }

            if (!isNaN(dev.age)) {
              dev.age = dev.age / 1000;
            } else {
              dev.age = 0;
            }
          });

          return data;
        }
      ]
    }
  });

  angular.merge(model.prototype, devices.methods);

  return model;

}]);
