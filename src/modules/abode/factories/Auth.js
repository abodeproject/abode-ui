
var abode = angular.module('abode');

abode.factory('Auth', ['$resource', '$q', '$http', 'abode', function($resource, $q, $http, abode) {

  var model = $resource(abode.url('/api/auth/:action'), {}, {
    login: {
      method: 'POST',
      params: {'action': 'login'}
    },
    logout: {
      method: 'POST',
      params: {'action': 'logout'}
    },
    check: {
      method: 'GET',
      params: {'action': 'check'}
    },
  });

  model.prototype.$assign = function (device) {
    var defer = $q.defer(),
      url = abode.url('/api/auth/assign').value();

    $http.post(url, device).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;
}]);
