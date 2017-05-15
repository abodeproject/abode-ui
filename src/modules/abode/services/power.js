
var abode = angular.module('abode');

abode.service('power', ['$uibModal', function ($uibModal) {

  return {
    open: function () {
      return $uibModal.open({
        animation: false,
        templateUrl: 'modules/abode/views/power.html',
        size: 'sm',
        keyboard: false,
        backdrop: 'static',
        controller: ['$scope', '$http', '$uibModalInstance', '$timeout', '$interval', function ($uiScope, $http, $uibModalInstance, $timeout, $interval) {
          var timer;

          $uiScope.count_down = 0;
          $uiScope.action = "";

          var do_action = function (uri) {
            $http.post(uri).then(function () {

            }, function (err) {
              $uiScope.error = err.data.error || err.data.message || err;
            });
          };

          $uiScope.restart = function () {
            $uiScope.error = '';
            $uiScope.action = 'restart';
            $uiScope.count_down = 30;
            timer = $interval(function () {
              $uiScope.count_down -= 1;

              if ($uiScope.count_down === 0) {
                $interval.cancel(timer);
                do_action('/api/abode/restart');
              }
            }, 1000);
          };

          $uiScope.shutdown = function () {
            $uiScope.error = '';
            $uiScope.action = 'shutdown';
            $uiScope.count_down = 30;
            timer = $interval(function () {
              $uiScope.count_down -= 1;

              if ($uiScope.count_down === 0) {
                $interval.cancel(timer);
                do_action('/api/abode/shutdown');
              }
            }, 1000);
          };

          $uiScope.cancel = function () {
            if ($uiScope.count_down > 0) {
              $interval.cancel(timer);
              $uiScope.action = '';
              $uiScope.count_down = 0;
              return;
            }

            $uibModalInstance.dismiss();
          };

        }]
      });
    }
  };

}]);
