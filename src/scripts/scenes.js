var scenes = angular.module('abode.scenes', ['ui.router','ngResource']);

scenes.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/scenes', '/scenes/list');

  $stateProvider
  .state('main.scenes', {
    url: '/scenes',
    templateUrl: '/views/scenes/scenes.html',
  })
  .state('main.scenes.list', {
    url: '/list',
    templateUrl: '/views/scenes/scenes.list.html',
    controller: 'scenesList'
  })
  .state('main.scenes.add', {
    url: '/add',
    templateUrl: '/views/scenes/scenes.add.html',
    controller: 'scenesAdd'
  })
  .state('main.scenes.edit', {
    url: '/:name',
    templateUrl: '/views/scenes/scenes.edit.html',
    controller: 'scenesEdit',
    resolve: {
      'scene': function ($stateParams, $state, $q, scenes) {
        var defer = $q.defer();

        scenes.get($stateParams.name).then(function (response) {
          defer.resolve(response);
        }, function (err) {
          defer.reject(err);
          $state.go('main.scenes');
        });

        return defer.promise;

      }
    }
  });
});

scenes.factory('Scenes', ['$resource', '$http', '$q', 'abode', function($resource, $http, $q, abode) {

  var Scenes = $resource(abode.url('/api/scenes/:id'),{
    'id': '@_id'
  },{
    'update': {'method': 'PUT'},
  });

  Scenes.prototype.$on = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/scenes/' + this._id + '/on').value();

    $http.post(url).then(function (response) {
      self._on = true;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Scenes.prototype.$off = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/scenes/' + this._id + '/off').value();

    $http.post(url).then(function (response) {
      self._on = false;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  Scenes.prototype.$open = function () {

  };

  return Scenes;

}]);

scenes.service('scenes', function ($http, $q, $uibModal, $resource, abode) {
  var model = $resource(abode.url('/api/scenes/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'on': { method: 'POST', params: {'action': 'on'}},
    'off': { method: 'POST', params: {'action': 'off'}}
  });

  var loadScenes = function (source) {
    var defer = $q.defer();

    model.query({'source': source}).$promise.then(function (results) {
      defer.resolve(results);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var addScene = function (config) {
    var defer = $q.defer();

    $http.post('/api/scenes', config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getScene = function (scene, source) {
    var defer = $q.defer();
    var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

    $http({ url: source_uri + '/scenes/' + scene }).then(function (response) {

      response.data.$on = function () {
        return $http.post(source_uri + '/scenes/' + scene + '/on');
      };
      response.data.$off = function () {
        return $http.post(source_uri + '/scenes/' + scene + '/off');
      };
      response.data.$open = function () {
        return viewScene(scene, source);
      };
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getSceneRooms = function (scene) {
    var defer = $q.defer();

    $http({ url: '/api/scenes/' + scene + '/rooms'}).then(function (response) {

      defer.resolve(response.data);

    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var viewScene = function (scene, source) {

    return $uibModal.open({
      animation: true,
      templateUrl: 'views/scenes/scenes.view.html',
      size: 'sm',
      controller: function ($scope, $uibModalInstance, $interval, $timeout, $state, scenes, scene) {
        var intervals = [];
        var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

        $scope.name = scene.name;
        $scope.scene = scene;
        $scope.processing = false;
        $scope.errors = false;

        $scope.ok = function () {
          $uibModalInstance.close();
        };

        $scope.edit = function () {
          $uibModalInstance.close({'recurse': true});
          $state.go('index.scenes.edit', {'name': scene.name});
        };

        $scope.toggle_onoff = function () {
          var action = 'off';
          if ($scope.scene._state === 'stopped') {
            action = 'on';
          }

          $http.post(source_uri + '/scenes/' + $scope.scene.name + '/' + action).then(function () {
            $scope.processing = false;
            $scope.errors = false;
            $scope.scene._state = 'pending';

          }, function () {
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.reload = function () {
          if ($scope.processing) {
            return;
          }
          $scope.processing = true;
          $scope.errors = false;

          $http.get(source_uri + '/scenes/' + $scope.scene.name).then(function (response) {
            $scope.processing = false;
            $scope.errors = false;
            $scope.scene = response.data;

          }, function () {
            $scope.processing = false;
            $scope.errors = true;
          });

        };

        $scope.reload();

        intervals.push($interval($scope.reload, 5000));

        $scope.$on('$destroy', function () {
          intervals.forEach($interval.cancel);
        });
      },
      resolve: {
        scene: function () {
          return getScene(scene, source);
        },
        source: function () {
          return source;
        },
      }
    });

  };

  var addSceneRoom = function (scene, room) {
    var defer = $q.defer();

    $http.post('/api/scenes/' + scene + '/rooms', {'name': room}).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeSceneRoom = function (scene, room) {
    var defer = $q.defer();

    $http.delete('/api/scenes/' + scene + '/rooms/' + room).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var saveScene = function (scene) {
    var defer = $q.defer();

    $http.put('/api/scenes/' + scene._id, scene).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeScene = function (scene) {
    var defer = $q.defer();

    $http.delete('/api/scenes/' + scene).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  return {
    'load': loadScenes,
    'add': addScene,
    'view': viewScene,
    'get': getScene,
    'save': saveScene,
    'remove': removeScene,
    'getRooms': getSceneRooms,
    'addRoom': addSceneRoom,
    'removeRoom': removeSceneRoom
  };
});

scenes.controller('scenesList', function ($scope, $state, scenes) {
  $scope.scenes = [];
  $scope.loading = true;

  $scope.view = function (scene) {
    scenes.view(scene.name);
  };

  $scope.edit = function (scene) {
    $state.go('index.scenes.edit', {'name': scene.name});
  };

  $scope.load = function () {
    scenes.load().then(function (scenes) {
      $scope.scenes = scenes;
      $scope.loading = false;
      $scope.error = false;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };



  $scope.load();
});

scenes.controller('scenesAdd', function ($scope, $state, notifier, scenes) {
  $scope.scene = {};
  $scope.alerts = [];

  $scope.back = function () {
    $state.go('index.scenes');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.add = function () {
    scenes.add($scope.scene).then(function () {
      notifier.notify({'status': 'success', 'message': 'Scene Added'});
      $scope.scene = {};
    }, function (err) {
      notifier.notify({'status': 'failed', 'message': 'Failed to add Scene', 'details': err});
      $scope.errors = err;
    });
  };
});

scenes.controller('scenesEdit', function ($scope, $state, $uibModal, notifier, scene, devices, scenes, rooms, confirm) {
  $scope.scene = scene;
  $scope.alerts = [];
  $scope.rooms = [];
  $scope.loading = false;
  $scope.section = 'general';

  if (!scene) {
    $state.go('index.scenes.list');
  }

  var getRooms = function () {
    $scope.loading = true;
    scenes.getRooms(scene.name).then(function(rooms) {
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

  $scope.editAction = function (action) {var assign = $uibModal.open({
      animation: true,
      templateUrl: 'views/scenes/edit.action.html',
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
            'view': 'views/devices/capabilities/' + c + '.html'
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
          }
          if ($scope.has_capability('light') && $scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('light') && !$scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
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

          if ($scope.device._on) {
            $scope.device._on = false;
            $scope.device._level = 0;
          } else {
            $scope.device._on = true;
            $scope.device._level = 100;
          }
        };

        $scope.level_up = function () {
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level < 100){
            $scope.device._level += 1;
          }
          $scope.device._on = true;

        };

        $scope.level_down = function () {
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
      templateUrl: 'views/scenes/add.action.html',
      resolve: {
        assigned: function () {

          return step.actions.map(function (obj) {return obj.name; });
        },
        devices: function () {
          return devices.load();
        },
        scenes: function () {
          return scenes.load();
        },
        rooms: function () {
          return rooms.load();
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
              'view': 'views/devices/capabilities/' + c + '.html'
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
                'view': 'views/devices/capabilities/' + c + '.html'
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
          }
          if ($scope.has_capability('light') && $scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
            $scope.selected._level = $scope.device._level;
          }
          if ($scope.has_capability('light') && !$scope.has_capability('dimmer')) {
            $scope.selected._on = $scope.device._on;
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

          if ($scope.device._on) {
            $scope.device._on = false;
            $scope.device._level = 0;
          } else {
            $scope.device._on = true;
            $scope.device._level = 100;
          }
        };

        $scope.level_up = function () {
          if (isNaN($scope.device._level)) {
            $scope.device._level = 0;
          }
          if ($scope.device._level < 100){
            $scope.device._level += 1;
          }
          $scope.device._on = true;

        };

        $scope.level_down = function () {
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
    scenes.save($scope.scene).then(function () {
      notifier.notify({'status': 'success', 'message': 'Scene Saved'});
    }, function (err) {
      notifier.notify({'status': 'failed', 'message': 'Failed to save Scene', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Scene?').then(function () {
      scenes.remove(scene._id).then(function () {
        notifier.notify({'status': 'success', 'message': 'Scene Removed'});
        $state.go('index.scenes');
      }, function (err) {
        notifier.notify({'status': 'failed', 'message': 'Failed to remove Scene', 'details': err});
        $scope.errors = err;
      });
    });
  };

  $scope.removeRoom = function (id) {

    confirm('Are you sure?').then(function () {
      scenes.removeRoom(scene.name, id).then(function () {
        getRooms();
        notifier.notify({'status': 'success', 'message': 'Room removed from Scene'});
      }, function (err) {
        notifier.notify({'status': 'failed', 'message': 'Failed to remove Room from Scene', 'details': err});
      });
    });

  };

  $scope.addRoom = function () {
    var assign = $uibModal.open({
      animation: true,
      templateUrl: 'views/scenes/assign.html',
      size: 'sm',
      resolve: {
        assigned: function () {
          return $scope.rooms.map(function (obj) {return obj.name; });
        }
      },
      controller: function ($scope, $uibModalInstance, rooms, assigned) {
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
          rooms.load().then(function (rooms) {
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

      scenes.addRoom(scene.name, room.name).then(function () {
        getRooms();
        notifier.notify({'status': 'success', 'message': 'Room added to Scene'});
      }, function () {
        notifier.notify({'status': 'failed', 'message': 'Failed to add Room to Scene', 'details': err});
      });

    });
  };

});

scenes.controller('scene', function () {

});
