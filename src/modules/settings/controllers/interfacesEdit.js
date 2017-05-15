
var settings = angular.module('abode.settings');

settings.controller('interfacesEdit', ['$scope', '$state', '$templateCache', 'abode', 'iface', function ($scope, $state, $templateCache, abode, iface) {
  $scope.iface = iface;

  $scope.save = function () {
    $scope.iface.$update().then(function () {
      $templateCache.put(abode.url('/api/interfaces/' + $scope.iface.name + '/template').value(), $scope.iface.template);
      $templateCache.put(abode.url('/api/interfaces/' + $scope.iface._id + '/template').value(), $scope.iface.template);
      abode.message({'type': 'success', 'message': 'Interface Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Interface', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    $scope.iface.$delete().then(function () {
      abode.message({'type': 'success', 'message': 'Interface Deleted'});
      $state.go('^');
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Interface', 'details': err});
      $scope.errors = err;
    });
  };
}]);
