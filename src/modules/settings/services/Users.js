
var settings = angular.module('abode.settings');

settings.service('Users', ['$q', '$http', '$resource', 'abode', function ($q, $http, $resource, abode) {

  var UserModel = $resource(abode.url('/api/auth/users/:id'), {id: '@_id'}, {
    'update': { method: 'PUT' }
  });

  var TokenModel = $resource(abode.url('/api/auth/users/:userid/tokens/:id'), {id: '@_id', 'userid': '@userid'}, {
    'update': { method: 'PUT' }
  });

  UserModel.prototype.$tokens = function () {
    var self = this,
      defer = $q.defer();

    TokenModel.query({'userid': self._id}).$promise.then(function (results) {

      results = results.map(function (item) {
        item.userid = self._id;
        return item;
      });

      defer.resolve(results);
    }, function (err) {
      defer.reject(err.data || err);
    });

    return defer.promise;
  };

  var list_users = function (options) {
    return UserModel.query(options).$promise;
  };

  var create_user = function (options) {
    return new UserModel(options);
  };

  var get_user = function (options) {
    return UserModel.get(options).$promise;
  };

  return {
    'query': list_users,
    'create': create_user,
    'get': get_user
  };
}]);
