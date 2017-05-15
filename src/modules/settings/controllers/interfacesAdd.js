
var settings = angular.module('abode.settings');

settings.controller('interfacesAdd', ['$scope', '$state', 'abode', 'Interfaces', function ($scope, $state, abode, Interfaces) {
  $scope.iface = new Interfaces();

  $scope.save = function () {
    $scope.iface.$save().then(function (record) {
      abode.message({'type': 'success', 'message': 'Interface Created'});
      $state.go('^', record);

    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to Create Interface', 'details': err});
      $scope.errors = err;
    });
  };

}]);
