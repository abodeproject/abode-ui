
var rooms = angular.module('abode.rooms');

rooms.controller('roomsEdit', function ($scope, $state, $uibModal, abode, rooms, room, RoomDevices, confirm) {
  $scope.room = room;
  $scope.alerts = [];
  $scope.devices = [];
  $scope.scenes = [];
  $scope.loading = false;
  $scope.section = 'general';

  if (!room) {
    $state.go('main.rooms.list');
  }

  var getDevices = function () {
    $scope.loading = true;
    room.$devices().$promise.then(function (devices) {
      $scope.devices = devices;
      $scope.loading = false;
    }, function (error) {
      $scope.loading = false;
    });
  };

  var getScenes = function () {
    $scope.loading = true;
    room.$scenes().$promise.then(function (scenes) {
      $scope.scenes = scenes;
      $scope.loading = false;
    }, function (error) {
      $scope.loading = false;
    });
  };

  getDevices();

  $scope.back = function () {
    $state.go('main.rooms');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.save = function () {
    $scope.room.$update().then(function () {
      abode.message({'type': 'success', 'message': 'Room Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Room', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Room?').then(function () {
      $scope.room.$remove().then(function () {
        abode.message({'type': 'success', 'message': 'Room Removed'});
        $state.go('main.rooms');
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Room', 'details': err});
        $scope.errors = err;
      });
    });
  };

  $scope.removeDevice = function (id) {

    confirm('Are you sure?').then(function () {
      $scope.room.$removeDevice(id).then(function () {
        getDevices();
        abode.message({'type': 'success', 'message': 'Device removed from Room'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Device from Room', 'details': err});
      });
    });

  };

  $scope.addDevice = function () {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/rooms/views/assign.html',
      size: 'sm',
      resolve: {
        assigned: function () {
          return $scope.devices.map(function (obj) {return obj.name; });
        }
      },
      controller: function ($scope, $uibModalInstance, devices, assigned) {
        $scope.loading = true;
        $scope.devices = [];
        $scope.assigned = assigned;

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $scope.select = function (device) {
          $uibModalInstance.close(device);
        };

        $scope.load = function () {
          devices.load().then(function (devices) {
            $scope.devices = devices;
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

    assign.result.then(function (device) {

      $scope.room.$addDevice(device).then(function () {
        getDevices();
        abode.message({'type': 'success', 'message': 'Device added to Room'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to add Device to Room', 'details': err});
      });

    });
  };

  $scope.removeScene = function (id) {

    confirm('Are you sure?').then(function () {
      $scope.room.$removeScene(id).then(function () {
        getScenes();
        abode.message({'type': 'success', 'message': 'Scene removed from Room'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Scene from Room', 'details': err});
      });
    });

  };

  $scope.addScene = function () {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/rooms/views/assign.scene.html',
      size: 'sm',
      resolve: {
        assigned: function () {
          return $scope.scenes.map(function (obj) {return obj.name; });
        }
      },
      controller: function ($scope, $uibModalInstance, Scenes, assigned) {
        $scope.loading = true;
        $scope.scenes = [];
        $scope.assigned = assigned;

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $scope.select = function (device) {
          $uibModalInstance.close(device);
        };

        $scope.load = function () {
          Scenes.query().$promise.then(function (scenes) {
            $scope.scenes = scenes;
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

    assign.result.then(function (scene) {

      $scope.room.$addScene(scene).then(function () {
        getScenes();
        abode.message({'type': 'success', 'message': 'Scene added to Room'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to add Scene to Room', 'details': err});
      });

    });
  };

});
