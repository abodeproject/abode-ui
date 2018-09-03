
var settings = angular.module('abode.settings');

settings.controller('pinsAdd', ['$scope', '$state', 'abode', 'triggers', 'settings', 'Pins', function ($scope, $state, abode, triggers, settings, Pins) {
  'use strict';

  $scope.pin = new Pins();
  $scope.pin.panels = $scope.pin.panels || [];
  $scope.pin.actions = $scope.pin.actions || [];

  $scope.addAction = triggers.addAction;
  $scope.editAction = triggers.editAction;
  $scope.removeAction = triggers.removeAction;

  $scope.addPanel = settings.add_pin_panel;
  $scope.editPanel = settings.edit_pin_panel;
  $scope.removePanel = settings.remove_pin_panel;

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
