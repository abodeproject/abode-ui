
var devices = angular.module('abode.devices');

devices.controller('devicesEdit', function ($scope, $state, $uibModal, $q, abode, devices, device, confirm, providers, capabilities) {
  $scope.providers = providers;
  $scope.capabilities = capabilities;
  $scope.device = device;
  $scope.alerts = [];
  $scope.rooms = [];
  $scope.loading = false;
  $scope.section = 'provider';
  $scope.provider_template = 'modules/' + device.provider + '/views/edit.html';


  if (!device) {
    $state.go('index.devices.list');
  }

  var getRooms = function () {
    $scope.loading = true;
    $scope.device.$rooms().$promise.then(function(rooms) {
      $scope.rooms = rooms;
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  };

  getRooms();

  $scope.back = function () {
    $state.go('main.devices.list');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.save = function () {
    var defer = $q.defer();

    $scope.device.$update().then(function () {
      abode.message({'type': 'success', 'message': 'Device Saved'});
      defer.resolve();
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Device', 'details': err});
      $scope.errors = err;
      defer.reject();
    });

    return defer.promise;
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Device?').then(function () {
      $scope.device.$remove().then(function () {
        abode.message({'type': 'success', 'message': 'Device Removed'});
        $state.go('main.devices');
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Device', 'details': err});
        $scope.errors = err;
      });
    });
  };

  $scope.removeRoom = function (id) {

    confirm('Are you sure?').then(function () {
      devices.removeRoom(device.name, id).then(function () {
        getRooms();
        abode.message({'type': 'success', 'message': 'Room removed from Device'});
      }, function () {
        abode.message({'type': 'failed', 'message': 'Failed to remove Room from Device', 'details': err});
      });
    });

  };

  $scope.addRoom = function () {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/devices/views/assign.html',
      size: 'sm',
      resolve: {
        assigned: function () {
          return $scope.rooms.map(function (obj) {return obj.name; });
        }
      },
      controller: function ($scope, $uibModalInstance, Rooms, assigned) {
        $scope.loading = true;
        $scope.rooms = [];
        $scope.assigned = assigned;

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $scope.select = function (room) {
          $uibModalInstance.close(room);
        };

        $scope.load = function () {
          Rooms.query().$promise.then(function (rooms) {
            $scope.rooms = rooms;
            $scope.loading = false;
            $scope.error = false;
          }, function () {
            $scope.loading = false;
            $scope.error = true;
          });
        };

        $scope.load();

      }
    });

    assign.result.then(function (room) {

      devices.addRoom(device.name, room.name).then(function () {
        getRooms();
        abode.message({'type': 'success', 'message': 'Room added to Device'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to add Room to Device', 'details': err});
      });

    });

  };

  $scope.toggle_capability = function (capability) {
    if ($scope.has_capability(capability)) {
      $scope.device.capabilities.splice($scope.device.capabilities.indexOf(capability), 1);
    } else {
      $scope.device.capabilities.push(capability);
    }
  };

  $scope.has_capability = function (capability) {
    return ($scope.device.capabilities.indexOf(capability) !== -1);
  };

});
