
var settings = angular.module('abode.settings');

settings.controller('pinsEdit', ['$scope', '$state', '$uibModal', 'abode', 'triggers', 'devices', 'settings', 'confirm', 'pin', function ($scope, $state, $uibModal, abode, triggers, devices, settings, confirm, pin) {
  $scope.pin = pin;
  $scope.pin.panels = $scope.pin.panels || [];
  $scope.pin.actions = $scope.pin.actions || [];

  $scope.addAction = triggers.addAction;
  $scope.editAction = triggers.editAction;
  $scope.removeAction = triggers.removeAction;

  $scope.addPanel = settings.add_pin_panel;
  $scope.editPanel = settings.edit_pin_panel;
  $scope.removePanel = settings.remove_pin_panel;

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
