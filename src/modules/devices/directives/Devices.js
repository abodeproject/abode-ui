
var devices = angular.module('abode.devices');

devices.factory('Devices', ['$resource', '$http', '$q', 'abode', 'devices', function($resource, $http, $q, abode, devices) {

  var Devices = $resource(abode.url('/api/devices/:id'),{
    'id': '@_id'
  },{
    'update': {'method': 'PUT'},
  });

  angular.merge(Devices.prototype, devices.methods);

  return Devices;

}]);
