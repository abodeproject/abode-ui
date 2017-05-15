
var scenes = angular.module('abode.scenes');

scenes.factory('RoomScenes', ['$resource', 'abode', 'scenes', function ($resource, abode, scenes) {

  var model = $resource(abode.url('/api/rooms/:room/scenes/:id'), {id: '@_id'}, {
    'query': {
      isArray: true,
      transformResponse: [
        function (data, headers, status) {
          if (status !== 200) {
            return data;
          }
          data = angular.fromJson(data);

          data.forEach(function (dev) {
            if (dev._on === true) {
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

  angular.merge(model.prototype, scenes.methods);

  return model;

}]);
