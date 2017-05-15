
var scenes = angular.module('abode.scenes');

scenes.factory('Scenes', ['$resource', '$http', '$q', 'abode', 'scenes', function($resource, $http, $q, abode, scenes) {

  var model = $resource(abode.url('/api/scenes/:id'),{
    'id': '@_id'
  },{
    'update': {'method': 'PUT'},
  });

  angular.merge(model.prototype, scenes.methods);

  return model;

}]);
