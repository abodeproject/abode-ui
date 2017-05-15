
var settings = angular.module('abode.settings');

settings.controller('pinsEdit', ['$scope', '$state', 'abode', 'triggers', 'confirm', 'pin', function ($scope, $state, abode, triggers, confirm, pin) {
  $scope.pin = pin;

  $scope.addAction = triggers.addAction;
  $scope.editAction = triggers.editAction;
  $scope.removeAction = triggers.removeAction;

  $scope.save = function () {
    if ($scope.pin.pin === '') {
      $scope.pin.pin = undefined;
    }
    $scope.pin.$update().then(function () {
      $scope.pin.pin = undefined;
      abode.message({'type': 'success', 'message': 'Pin saved successfully'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': err.data.message || err.data || 'Failed to add Pin'});
    });
  };

  $scope.delete = function () {

    confirm('Are you sure?', {'title': 'Delete PIN', 'icon': 'icon-trash'}).then(function () {
      $scope.pin.$delete().then(function () {
        abode.message({'type': 'success', 'message': 'Pin Deleted'});
        $state.go('^');
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to delete Pin', 'details': err});
        $scope.errors = err;
      });
    });

  };

}]);
