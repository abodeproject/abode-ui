
var settings = angular.module('abode.settings');

settings.controller('installProvidersController', ['$scope', '$uibModalInstance', 'settings', 'provider', function ($scope, $uibModalInstance, settings, provider) {
  'use strict';

  $scope.loading = false;
  $scope.error = false;
  $scope.provider = provider;

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };

  $scope.install = function () {
    $scope.loading = true;
    $scope.error = false;

    settings.install_provider(provider.id).then(function () {
      $scope.loading = false;
      $uibModalInstance.close();
    }, function (err) {
      $scope.loading = false;
      $scope.error = err;
    });
  };
}]);
