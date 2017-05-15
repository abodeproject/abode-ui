
var abode = angular.module('abode');

abode.controller('rootController', ['$rootScope', '$scope', '$state', '$window', 'abode', '$timeout', '$uibModal', function ($rootScope, $scope, $state, $window, abode, $timeout, $uibModal) {

  var idleTimer;

  $scope.is_idle = false;

  $rootScope.breakIdle = function ($event) {
    var dim,
      delay;

    if (abode.config && abode.config.auth && abode.config.auth.device) {
      dim = abode.config.auth.device.config.dim_display;
      delay = abode.config.auth.device.config.dim_after || 15;
    }
    if (idleTimer) {
      $timeout.cancel(idleTimer);
    }

    if ($scope.is_idle) {
      if ($event) { $event.preventDefault(); }
      $timeout(function () {
        $scope.is_idle = false;
        $scope.$digest();
      }, 250);
    }

    if (dim) {
      idleTimer = $timeout(function () {
        $scope.is_idle = true;
      }, 1000 * delay);

    }
  };

  $window.addEventListener('click', $rootScope.breakIdle);
  $window.addEventListener('mousemove', $rootScope.breakIdle);
  $window.addEventListener('keypress', $rootScope.breakIdle);

  $rootScope.breakIdle();

  $scope.serverGone_modal = false;
  $scope.serverGone = function (toState, toParams) {

    if ($scope.serverGone_modal) {
      return;
    }

    $scope.serverGone_modal = true;
    return $uibModal.open({
      animation: false,
      keyboard: false,
      backdrop: 'static',
      templateUrl: 'modules/abode/views/server_gone.html',
      size: 'lg',
      controller: ['$scope', '$uibModalInstance', '$state', function (scope, $uibModalInstance, $state) {

        scope.retry = function () {
          $scope.serverGone_modal = false;
          $uibModalInstance.close();
          $state.go(toState, toParams);
        };

        scope.select = function () {
          $scope.serverGone_modal = false;
          abode.save({});

          $uibModalInstance.close();
          $state.go('welcome');
        };
      }]
    });
  };

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

    if (error.action && $scope[error.action]) {
      $scope[error.action](toState, toParams);
      return;
    }
    if (error.message || error.state !== 'welcome') {
      abode.message({'message': error.message || 'Error Loading Page', 'type': 'error'});
      console.dir(error);
    }
    $rootScope.loading = false;
    event.preventDefault();
    if ( ! error ) {
      alert('Application failed to load');
    } else {
      if (error.state && toState.name !== error.state) {
        $state.go(error.state, error);
      }
    }
  });

}]);
