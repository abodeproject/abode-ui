
var abode = angular.module('abode');

abode.factory('AuthDevice', ['$resource', '$q', '$http', 'abode', function($resource, $q, $http, abode) {

  var model = $resource(abode.url('/api/auth/device'), {}, {
    'update': {'method': 'PUT'}
  });

  model.prototype.$set_interface = function (interface) {
    var defer = $q.defer(),
      url = abode.url('/api/auth/device/set_interface').value();

    $http.post(url, {'interface': interface}).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;
}]);
