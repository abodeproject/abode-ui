
var abode = angular.module('abode');

abode.service('confirm', function ($q, $uibModal) {
  return function (msg, options) {
    var defer = $q.defer();

    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'modules/abode/views/confirm.html',
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
      controller: function ($scope, $uibModalInstance) {
        $scope.msg = msg;
        $scope.options = options;

        $scope.no = function () {
          $uibModalInstance.dismiss();
        };

        $scope.yes = function () {
          $uibModalInstance.close();
        };

      }
    });

    modal.result.then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };
});
