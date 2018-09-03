
var devices = angular.module('abode.devices');

devices.directive('selectDevice', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      value: '=',
      required: '=',
      capabilities: '=',
      exclude: '='
    },
    controller: function ($scope, $uibModal, devices) {
      $scope.capabilities = $scope.capabilities || [];
      $scope.exclude = $scope.exclude || [];
      $scope.loading = false;
      $scope.error = false;

      if ($scope.value) {
        $scope.loading = true;
        devices.get($scope.value._id).then(function (device) {
          $scope.error = false;
          $scope.loading = false;
          $scope.device = {
            '_id': device._id,
            'name': device.name,
            'icon': device.icon,
          };
        }, function () {
          $scope.error = true;
          $scope.loading = false;
        });
      }

      $scope.openAssign = function () {
        var assign = $uibModal.open({
          animation: true,
          templateUrl: 'modules/devices/views/devices.select.modal.html',
          size: 'sm',
          controller: ['$scope', '$uibModalInstance', function ($uiscope, $uibModalInstance) {
            $uiscope.devices = [];
            $uiscope.loading = true;
            $uiscope.required = $scope.required;

            $uiscope.select = function (selected) {
              if (selected) {
                $uibModalInstance.close({'_id': selected._id, 'name': selected.name, 'icon': selected.icon});
              } else {
                $uibModalInstance.close();
              }
            };

            $uiscope.cancel = function () {
              $uibModalInstance.dismiss();
            };

            devices.load().then(function (devices) {
              if ($scope.capabilities.length > 0) {
                $uiscope.devices = devices.filter(function (device) {
                  var found = false;

                  $scope.capabilities.forEach(function (c) {
                    found = (device.capabilities.indexOf(c) >= 0) ? true : found;
                  });

                  $scope.exclude.forEach(function (d) {
                    found = (device._id === d._id) ? false : found;
                  });

                  return found;
                });
              } else {
                $uiscope.devices = devices.filter(function (device) {
                  var found = true;

                  $scope.exclude.forEach(function (d) {
                    found = (device._id === d._id) ? false : found;
                  });

                  return found;
                });
              }
              $uiscope.loading = false;
              $uiscope.error = false;
            }, function () {
              $uiscope.loading = false;
              $uiscope.error = true;
            });
          }]
        });

        assign.result.then(function (result) {
          if (result) {
            $scope.device = result;
            $scope.value = {
              '_id': result._id,
              'name': result.name,
            };
            $scope.error = false;
          } else {
            $scope.device = undefined;
            $scope.value = undefined;
            $scope.error = false;
          }
        });
      };

  var add_device = function (assigned) {
    return;
  };
    },
    templateUrl: 'modules/devices/views/devices.select.html',
    replace: true,
  };
});
