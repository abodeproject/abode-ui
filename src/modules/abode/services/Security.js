
var abode = angular.module('abode');

abode.service('Security', ['$uibModal', '$http', '$timeout', 'abode', function ($uibModal, $http, $timeout, abode) {
  var self = this;
  var lockModal;
  var unlock_timer;

  self.lock = function () {
    var device_id = abode.config.auth.device._id;
    $http.post(abode.url('/api/devices/' + device_id + '/lock').value()).then(undefined, function (err) {
      abode.message({'type': 'failed', 'message': err.data.message || err.data.msg || 'Could not lock device'});
    });
  };

  self.show_lock = function () {
    lockModal = $uibModal.open({
      animation: false,
      templateUrl: 'modules/abode/views/locked.html',
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
      controller: ['$scope', '$http', '$uibModalInstance', 'abode', function ($uiScope, $http, $uibModalInstance, abode) {
        $uiScope.pin = '';
        $uiScope.checking = false;
        $uiScope.error = false;
        $uiScope.success = false;

        $uiScope.unlock = function () {
          if ($uiScope.pin.length === 0) {
            return;
          }

          $uiScope.checking = true;
          var device_id = abode.config.auth.device._id;
          $http.post(abode.url('/api/auth/check_pin').value(), {'pin': $uiScope.pin}).then(function (result) {
            $uiScope.success = true;
            unlock_timer = $timeout(function () {
              $uiScope.success = false;
              $uiScope.checking = false;
              abode.message({'type': 'failed', 'message': 'Timeout waiting for unlock'});
            }, 10000);
          }, function () {
            $uiScope.error = true;
            $timeout(function () {
              $uiScope.pin = '';
              $uiScope.checking = false;
              $uiScope.error = false;
            }, 2000);
          });
        };

      }]
    });
  };

  self.hide_lock = function () {
    if (lockModal && lockModal.close) {
      lockModal.close();
    }

    if (unlock_timer) {
      $timeout.cancel(unlock_timer);
    }
  };

  return {
    lock: self.lock,
    show_lock: self.show_lock,
    hide_lock: self.hide_lock,
  };

}]);
