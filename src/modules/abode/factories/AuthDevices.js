
var abode = angular.module('abode');

abode.factory('AuthDevices', ['$resource', 'abode', function($resource, abode) {

  var model = $resource(abode.url('/api/auth/devices'), {}, {
  });

  return model;
}]);
