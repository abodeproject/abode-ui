
var settings = angular.module('abode.settings');

settings.controller('pinsAdd', ['$scope', '$state', 'abode', 'triggers', 'Pins', function ($scope, $state, abode, triggers, Pins) {
  $scope.pin = new Pins();

  $scope.addAction = triggers.addAction;
  $scope.editAction = triggers.editAction;
  $scope.removeAction = triggers.removeAction;

  $scope.add = function () {
    $scope.pin.$save().then(function () {
      $scope.pin = new Pins();
      abode.message({'type': 'success', 'message': 'Pin added successfully'});
      $state.go('^');
    }, function (err) {
      abode.message({'type': 'failed', 'message': err.data.message || err.data || 'Failed to add Pin'});
    });
  };

}]);
