
var triggers = angular.module('abode.triggers');

triggers.controller('triggersList', function ($scope, $state, Triggers, confirm) {
  $scope.triggers = [];
  $scope.loading = true;

  $scope.edit = function (trigger) {
    $state.go('main.triggers.edit', {name: trigger.name});
  };

  $scope.load = function () {
    Triggers.query().$promise.then(function (triggers) {
      $scope.triggers = triggers;
      $scope.loading = false;
      $scope.error = false;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.remove = function (trigger) {
    confirm('Are you sure you want to remove this Trigger?').then(function () {
      trigger.$remove().then(function () {
        $scope.load();
      }, function (err) {
        $scope.alerts = [{'type': 'danger', 'msg': 'Failed to remove Trigger'}];
        $scope.errors = err;
      });
    });
  };


  $scope.load();
});
