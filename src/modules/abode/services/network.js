
var abode = angular.module('abode');

abode.service('network', ['$uibModal', function ($uibModal) {
  return {
    open: function () {
      return $uibModal.open({
          animation: false,
          templateUrl: 'modules/abode/views/network.html',
          size: 'lg',
          controller: ['$scope', '$uibModalInstance', '$timeout', '$interval', '$http', function ($scope, $uibModalInstance, $timeout, $interval, $http) {
            $scope.networks = [];
            $scope.status = {};
            $scope.scanning = true;
            $scope.checking = true;
            $scope.manual_wifi = {'encryption': true};

            $scope.scan = function () {
              var attempt_defers = [];
              $scope.networks = [];
              $scope.scanning = true;

              $timeout(function () {

                $http.get('/api/network/wireless').then(function (response) {
                  $scope.scanning = false;
                  $scope.networks = response.data;
                }, function (err) {
                  $scope.scanning = false;
                });

              }, 100);

            };

            $scope.get_status = function () {
              $scope.checking = true;

              $timeout(function () {

                $http.get('/api/network').then(function (response) {
                  $scope.checking = false;
                  $scope.status = response.data;
                }, function (err) {
                  $scope.checking = false;
                });

              }, 100);
            };

            $scope.close = function () {
              $uibModalInstance.dismiss();
            };

            $scope.connect_wifi = function (ssid) {

              var modal = $uibModal.open({
                animation: false,
                templateUrl: 'modules/welcome/views/wifi.connect.html',
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                controller: ['$scope', '$uibModalInstance', '$timeout', function ($uiScope, $uibModalInstance, $timeout) {
                  $uiScope.ssid = ssid;
                  $uiScope.connecting = false;
                  $uiScope.error = false;
                  $uiScope.checking = false;
                  $uiScope.attempts = 0;
                  $uiScope.max_attempts = 30;

                  var wait_interval;

                  $uiScope.wait = function () {
                    if ($uiScope.checking) {
                      return;
                    }

                    $uiScope.attempts += 1;
                    if ($uiScope.attempts >= $uiScope.max_attempts) {
                      $interval.cancel(wait_interval);
                      $uiScope.error = 'Timeout waiting for network to become available';
                      $uiScope.connecting = false;
                      $uiScope.checking = false;
                      return;
                    }

                    $http.get('/api/network').then(function (response) {
                      $uiScope.checking = false;
                      if (!response.data.connected) {
                        $timeout($uiScope.wait, 5 * 1000);
                        return;
                      }

                      $uiScope.connected();
                    }, function () {
                      $uiScope.error = 'Error setting new wireless settings';
                      $uiScope.checking = false;
                    });

                  };

                  $uiScope.connected = function () {
                    $uibModalInstance.close();
                  };

                  $uiScope.connect = function () {
                    $uiScope.connecting = true;
                    $uiScope.attempts = 0;

                    $http.post('/api/network/connect', ssid).then(function (response) {
                      $timeout($uiScope.wait, 5 * 1000);
                    }, function () {
                      $uiScope.connecting = false;
                      $uiScope.error = false;
                    });
                  };

                  $uiScope.cancel = function () {
                    $uibModalInstance.dismiss();
                  };

                  if (!ssid.encryption) {
                    $uiScope.connect();
                  }
                }]
              });

              modal.result.then(function () {
                $scope.get_status();
              });
            };

            $timeout($scope.scan, 100);
            $timeout($scope.get_status, 100);

          }]
      });
    }
  };
}]);
