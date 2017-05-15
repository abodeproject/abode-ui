
var devices = angular.module('abode.devices');

devices.controller('devicesAdd', function ($scope, $state, abode, Devices, providers, capabilities) {
  $scope.device = new Devices({'capabilities': []});
  $scope.alerts = [];
  $scope.providers = providers;
  $scope.capabilities = capabilities;
  $scope.section = 'provider';
  $scope.provider_templates = {};

  $scope.providers.forEach(function (p) {
    $scope.provider_templates[p] = 'modules/' + p + '/views/add.html';
  });

  $scope.back = function () {
    $state.go('main.devices');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.changeProvider = function (p) {
    $scope.device.provider = p;
    $scope.section = 'settings';
    $scope.provider_template = 'modules/' + p + '/views/add.html';
  };

  $scope.add = function () {
    $scope.device.$save().then(function () {
      abode.message({'type': 'success', 'message': 'Device Added'});
      $scope.device = new Devices({'capabilities': []});
      $scope.section = 'provider';
    }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to add Device', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.toggle_capability = function (capability) {
    if ($scope.has_capability(capability)) {
      console.log('removing', capability);
      $scope.device.capabilities.splice($scope.device.capabilities.indexOf(capability), 1);
    } else {
      console.log('adding', capability);
      $scope.device.capabilities.push(capability);
    }
  };

  $scope.has_capability = function (capability) {
    return ($scope.device.capabilities.indexOf(capability) !== -1);
  };
});
