
var settings = angular.module('abode.settings');

settings.factory('Pins', ['$resource', '$q', '$http', 'abode', function($resource, $q, $http, abode) {

  var model = $resource(abode.url('/api/auth/pins/:id'), {id: '@_id'}, {
    'update': { method: 'PUT' }
  });

  return model;
}]);
