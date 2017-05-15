
var scenes = angular.module('abode.scenes');

scenes.factory('SceneRooms', ['$resource', 'abode', function ($resource, abode) {

  var model = $resource(abode.url('/api/scenes/:scene/rooms/:id'), {id: '@_id'}, {
    'query': {
      isArray: true,
    }
  });

  angular.merge(model.prototype, scenes.methods);

  return model;

}]);
