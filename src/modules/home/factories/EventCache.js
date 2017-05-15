
var home = angular.module('abode.home');

home.factory('EventCache', ['$resource', '$http', '$q', 'abode', function($resource, $http, $q, abode) {

  var eventcache = $resource(abode.url('/api/events?last=:last'),{},{});

  return eventcache;
}]);
