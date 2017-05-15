
var scenes = angular.module('abode.scenes');

scenes.controller('scenesEdit', function ($scope, $state, $uibModal, scene, devices, abode, scenes, rooms, confirm) {
  $scope.scene = scene;
  $scope.alerts = [];
  $scope.rooms = [];
  $scope.loading = false;
  $scope.section = 'general';

  if (!scene) {
    $state.go('main.scenes.list');
  }

  var getRooms = function () {
    $scope.loading = true;
    $scope.scene.$rooms().then(function(rooms) {
      $scope.rooms = rooms;
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  };

  getRooms();

  $scope.back = function () {
    $state.go('index.scenes');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.addStep = function () {
    $scope.scene._steps.push({
      'actions': [],
      'delay': 0,
      'wait': false,
    });
  };

  $scope.removeDevice = function(step, index) {
    step.actions.splice(index, 1);
  };

  $scope.sceneBuilder = function (actions) {
    var builder = $uibModal.open({
      animation: true,
      templateUrl: 'modules/scenes/views/scene.builder.html',
      resolve: {
      },
      controller: function ($scope, $uibModalInstance, $q, $timeout, Devices) {
        $scope.loading = true;
        $scope.devices = [];
        var device_defers = [];


        $scope.addDevice = function () {

          var deviceModal = $uibModal.open({
            animation: false,
            templateUrl: 'modules/scenes/views/scene.builder.devices.html',
            size: 'sm',
            controller: function ($scope, $uibModalInstance, Devices) {
              $scope.loading = true;
              $scope.closing = false;
              $scope.devices = [];

              Devices.query().$promise.then(function (results) {
                $scope.devices = results;
                $scope.loading = false;
              }, function () {
                $scope.loading = false;
              });

              $scope.select = function (device) {
                $scope.closing = true;
                Devices.get({'id': device._id}).$promise.then(function (record) {
                  $uibModalInstance.close(record);
                }, function () {
                  $scope.closing = false;
                });
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss();
              };

            }
          });

          deviceModal.result.then(function (device) {
            $scope.devices.push(device);
          });
        };

        $scope.set_device_level = function (device) {
          return function (id, level) {
            device.$set_level(level);
          };
        };

        actions.forEach(function (action) {
          if (action.object_type !== 'devices') {
            return;
          }

          var defer = $q.defer();
          device_defers.push(defer.promise);

          Devices.get({'id': action.name}).$promise.then(function (record) {
            if (record.capabilities.indexOf('dimmer') >= 0) {
              record._level = action._level;
              $scope.devices.push(record);
            }
            defer.resolve();
          }, function () {
            defer.resolve();
          });
        });

        $q.all(device_defers).then(function () {
          $scope.loading = false;
          $timeout(function () {
              $scope.$broadcast('rzSliderForceRender');
          }, 100);
        });

        $scope.close = function () {
          $uibModalInstance.close($scope.devices);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };
      }
    });

    builder.result.then(function (devices) {
      devices.forEach(function (device) {
        var matches = actions.filter(function (action) {
          return (action.name === device.name && action.object_type === 'devices');
        });

        if (matches.length > 0) {
          matches[0]._level = device._level;
          matches[0]._on = (device._level > 0);
          return;
        }

        actions.push({
          'name': device.name,
          'object_type': 'devices',
          'object_id': device._id,
          'stages': 0,
          '_level': device._level,
          '_on': (device._level > 0)
        });

      });
    });
  };

  $scope.editAction = function (action) {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/scenes/views/edit.action.html',
      resolve: {
        selected: function () {
          return action;
        },
        action: function () {
          switch (action.object_type) {
            case 'devices':
              return devices.get(action.object_id);
            case 'rooms':
              return rooms.get(action.object_id);
            case 'scenes':
              return scenes.get(action.object_id);
            default:
              return undefined;
          }
        }
      },
      controller: function ($scope, $uibModalInstance, action, selected) {
        $scope.loading = true;
        $scope.device = action;
        $scope.selected = selected;
        $scope.selected_capabilities = [];

        Object.keys($scope.selected).forEach(function (k) {
          if (k[0] !== '_') {
            return;
          }
          $scope.device[k] = $scope.selected[k];
        });

        switch (selected.object_type) {
          case 'devices':
            $scope.selected_capabilities = $scope.device.capabilities;
            break;
          case 'scenes':
            $scope.selected_capabilities = ['light'];
            break;
          case 'scenes':
            $scope.selected_capabilities = ['dimmer', 'light'];
            break;
        }

        $scope.capabilities = angular.copy($scope.selected_capabilities).map(function (c) {
          return {
            'name': c,
            'view': 'modules/devices/views/capabilities/' + c + '.html'
          };

        });

        $scope.controls = $scope.capabilities.filter(function (c) {

          return (c.name.indexOf('_sensor') === -1);

        });

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $scope.save = function () {

          if ($scope.has_capability('fan')) {
            $scope.selected._on = $scope.device._on;
          }
          if ($scope.has_capability('display')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
            $scope.selected.locked = $scope.device.locked;
          }
          if ($scope.has_capability('light') && $scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('light') && !$scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
          }
          if ($scope.has_capability('lock')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('conditioner')) {
            $scope.selected._mode = $scope.device._mode;
            $scope.selected._set_point = $scope.device._set_point;
          }

          $uibModalInstance.close($scope.selected);
        };

        $scope.has_capability = function (capability) {
          var match = $scope.capabilities.filter(function (c) {

            return (c.name === capability);

          });

          return (match.length > 0);
        };



        $scope.stages_up = function () {
          if (isNaN($scope.selected.stages)) {
            $scope.selected.stages = 0;
          }
          if ($scope.selected.stages < 100){
            $scope.selected.stages += 1;
          }

        };

        $scope.stages_down = function () {
          if (isNaN($scope.selected.stages)) {
            $scope.selected.stages = 0;
          }
          if ($scope.selected.stages > 0){
            $scope.selected.stages -= 1;
          }
        };


        $scope.toggle_onoff = function () {

          $scope.processing = true;
          $scope.errors = false;
          $scope.device.locked = undefined;

          if ($scope.device._on) {
            $scope.device._on = false;
            $scope.device._level = 0;
          } else {
            $scope.device._on = true;
            $scope.device._level = 100;
          }
        };


        $scope.on = function () {

          $scope.device._on = true;
        };

        $scope.off = function () {

          $scope.device._on = true;
        };

        $scope.display_lock = function () {

          $scope.device.locked = true;
          $scope.device._level = undefined;
          $scope.device._on = undefined;

        };

        $scope.display_unlock = function () {

          $scope.device.locked = false;
          $scope.device._level = undefined;
          $scope.device._on = undefined;

        };

        $scope.lock = function () {

          $scope.device._on = true;
          $scope.device._level = 100;

        };

        $scope.unlock = function () {

          $scope.device._on = false;
          $scope.device._level = 0;

        };

        $scope.level_up = function () {
          $scope.device.locked = undefined;
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level < 100){
            $scope.device._level += 1;
          }
          $scope.device._on = true;

        };

        $scope.level_down = function () {
          $scope.device.locked = undefined;
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level > 0){
            $scope.device._level -= 1;
          }

          if ($scope.device._level === 0){
            $scope.device._on = false;
          }
        };

        $scope.set_mode = function (mode) {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._mode = mode;
        };

        $scope.temp_up = function () {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._set_point += 1;
        };

        $scope.temp_down = function () {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._set_point -= 1;
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

    assign.result.then(function (result) {
      action = result;

    });
  };

  $scope.addAction = function (step) {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/scenes/views/add.action.html',
      resolve: {
        assigned: function () {

          return step.actions.map(function (obj) {return obj.name; });
        },
        devices: function (Devices) {
          return Devices.query().$promise;
        },
        scenes: function (Scenes) {
          return Scenes.query().$promise;
        },
        rooms: function (Rooms) {
          return Rooms.query().$promise;
        }
      },
      controller: function ($scope, $uibModalInstance, devices, scenes, rooms, assigned) {
        $scope.devices = devices;
        $scope.scenes = scenes;
        $scope.rooms = rooms;
        $scope.assigned = assigned;
        $scope.selected = {};
        $scope.selected_capabilities = [];



        $scope.action_types = [
          {name: 'Device', value: 'devices', icon: 'glyphicon glyphicon-oil'},
          {name: 'Room', value: 'rooms', icon: 'glyphicon glyphicon-modal-window', capabilities: ['light']},
          {name: 'Scene', value: 'scenes', icon: 'icon-picture', capabilities: ['light']},
        ];

        $scope.changeType = function (t) {
          $scope.selected.object_type = t.value;
          $scope.selected.object_id = undefined;
          $scope.selected_capabilities = t.capabilities;
        };

        $scope.changeItem = function (o) {
          $scope.selected.object_id = o._id;
          $scope.selected.stages = 0;
          $scope.selected.duration = 0;
          $scope.device = o;
          if (o.capabilities) {
            $scope.selected_capabilities = o.capabilities;
          }


          $scope.capabilities = angular.copy($scope.selected_capabilities).map(function (c) {
            return {
              'name': c,
              'view': 'modules/devices/views/capabilities/' + c + '.html'
            };

          });

          $scope.controls = $scope.capabilities.filter(function (c) {

            return (c.name.indexOf('_sensor') === -1);

          });

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $scope.selectDevice = function (device) {
          $scope.selected = {
            'stages': 0,
            'duration': 0
          };
          $scope.loading = true;

          devices.get(device.name).then(function(device) {
            $scope.loading = false;
            $scope.device = device;

            $scope.capabilities = angular.copy(device.capabilities).map(function (c) {
              return {
                'name': c,
                'view': 'modules/devices/views/capabilities/' + c + '.html'
              };

            });

            $scope.controls = $scope.capabilities.filter(function (c) {

              return (c.name.indexOf('_sensor') === -1);

            });

          });

        };

        $scope.add = function () {
          $scope.selected.name = $scope.device.name;

          if ($scope.has_capability('fan')) {
            $scope.selected._on = $scope.device._on;
          }
          if ($scope.has_capability('display')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
            $scope.selected.locked = $scope.device.locked;
          }
          if ($scope.has_capability('light') && $scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('light') && !$scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
          }
          if ($scope.has_capability('scene')) {
            $scope.selected._on = $scope.device._on;
          }
          if ($scope.has_capability('shade')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('lock')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('conditioner')) {
            $scope.selected._mode = $scope.device._mode;
            $scope.selected._set_point = $scope.device._set_point;
          }

          $uibModalInstance.close($scope.selected);
        };

        $scope.has_capability = function (capability) {
          var match = $scope.capabilities.filter(function (c) {

            return (c.name === capability);

          });

          return (match.length > 0);
        };



        $scope.stages_up = function () {
          if (isNaN($scope.selected.stages)) {
            $scope.selected.stages = 0;
          }
          if ($scope.selected.stages < 100){
            $scope.selected.stages += 1;
          }

        };

        $scope.stages_down = function () {
          if (isNaN($scope.selected.stages)) {
            $scope.selected.stages = 0;
          }
          if ($scope.selected.stages > 0){
            $scope.selected.stages -= 1;
          }
        };


        $scope.toggle_onoff = function () {

          $scope.processing = true;
          $scope.errors = false;
          $scope.device.locked = undefined;

          if ($scope.device._on) {
            $scope.device._on = false;
            $scope.device._level = 0;
          } else {
            $scope.device._on = true;
            $scope.device._level = 100;
          }
        };


        $scope.on = function () {
            $scope.device._on = true;
        };


        $scope.off = function () {
            $scope.device._on = false;
        };

        $scope.lock = function () {

          $scope.device._on = true;
          $scope.device._level = 100;

        };

        $scope.unlock = function () {

          $scope.device._on = false;
          $scope.device._level = 0;

        };

        $scope.display_lock = function () {

          $scope.device.locked = true;
          $scope.device._level = undefined;
          $scope.device._on = undefined;

        };

        $scope.display_unlock = function () {

          $scope.device.locked = false;
          $scope.device._level = undefined;
          $scope.device._on = undefined;

        };

        $scope.level_up = function () {
          $scope.device.locked = undefined;
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level < 100){
            $scope.device._level += 1;
          }
          $scope.device._on = true;

        };

        $scope.level_down = function () {
          $scope.device.locked = undefined;
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level > 0){
            $scope.device._level -= 1;
          }

          if ($scope.device._level === 0){
            $scope.device._on = false;
          }
        };

        $scope.set_mode = function (mode) {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._mode = mode;
        };

        $scope.temp_up = function () {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._set_point += 1;
        };

        $scope.temp_down = function () {
          if (isNaN($scope.device._set_point)) {
            $scope.device._set_point = 58;
          }
          $scope.device._set_point -= 1;
        };

      }
    });

    assign.result.then(function (device) {
      step.actions = step.actions || [];
      step.actions.push(device);

    });
  };

  $scope.removeStep = function (index) {
    $scope.scene._steps.splice(index, 1);
  };

  $scope.save = function () {
    $scope.scene.$update().then(function () {
      abode.message({'type': 'success', 'message': 'Scene Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Scene', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Scene?').then(function () {
      $scope.scene.$remove().then(function () {
        abode.message({'type': 'success', 'message': 'Scene Removed'});
        $state.go('main.scenes');
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Scene', 'details': err});
        $scope.errors = err;
      });
    });
  };

  $scope.removeRoom = function (id) {

    confirm('Are you sure?').then(function () {
      $scope.scene.$removeRoom(id).then(function () {
        getRooms();
        abode.message({'type': 'success', 'message': 'Room removed from Scene'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Room from Scene', 'details': err});
      });
    });

  };

  $scope.addRoom = function () {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'modules/scenes/views/assign.html',
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

      $scope.scene.$addRoom(room.name).then(function () {
        getRooms();
        abode.message({'type': 'success', 'message': 'Room added to Scene'});
      }, function () {
        abode.message({'type': 'failed', 'message': 'Failed to add Room to Scene', 'details': err});
      });

    });
  };

});
