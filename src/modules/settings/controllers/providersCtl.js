
var settings = angular.module('abode.settings');

settings.controller('providersCtl', function ($scope, $state, $uibModal, abode, settings) {

  $scope.loading = false;
  $scope.error = false;
  $scope.providers = [];

  var get_providers = function () {
    $scope.loading = true;
    $scope.error = false;

    settings.get_providers().then(function (providers) {
      $scope.loading = false;
      $scope.providers = providers;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.providerSettings = function (provider) {
    if (provider.installed) {
      $state.go('main.settings.' + provider.id);
    }
  };

  $scope.remove_provider = function (provider) {
    var modal = $uibModal.open({
      keyboard: false,
      backdrop: 'static',
      'controller': 'removeProvidersController',
      'resolve': {
        'provider': function () {
          return provider;
        }
      },
      'templateUrl': 'modules/settings/views/settings.providers.remove.html'
    });

    modal.result.then(function () {
      get_providers();
    });
  };

  $scope.install_provider = function (provider) {
    var modal = $uibModal.open({
      keyboard: false,
      backdrop: 'static',
      'controller': 'installProvidersController',
      'resolve': {
        'provider': function () {
          return provider;
        }
      },
      'templateUrl': 'modules/settings/views/settings.providers.install.html'
    });

    modal.result.then(function () {
      get_providers();
    });
  };


  get_providers();
});
