
var home = angular.module('abode.home');

home.factory('Interfaces', ['$resource', '$http', '$q', 'abode', function($resource, $http, $q, abode) {

  var interfaces = $resource(abode.url('/api/interfaces/:id'),{
    'id': '@_id'
  },{
    'update': {'method': 'PUT'},
  });

  interfaces.template = function (name) {
    var defer = $q.defer();

    $http.get(abode.url('/api/interfaces/' + name + '/template').value()).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  return interfaces;
}]);
