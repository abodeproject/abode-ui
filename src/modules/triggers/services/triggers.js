
var triggers = angular.module('abode.triggers');

triggers.service('triggers', function ($http, $q, $uibModal, $resource, abode, confirm, Devices, Rooms, Scenes) {
  var model = $resource(abode.url('/api/triggers/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
  });

  var load = function (source) {
    var defer = $q.defer();

    model.query({'source': source}).$promise.then(function (results) {
      defer.resolve(results);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getTypes = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/abode/triggers').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var addTrigger = function (config) {
    var defer = $q.defer();

    $http.post('/api/triggers', config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getTrigger = function (trigger) {
    var defer = $q.defer();

    $http({ url: '/api/triggers/' + trigger }).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var saveTrigger = function (trigger) {
    var defer = $q.defer();

    $http.put('/api/triggers/' + trigger._id, trigger).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeTrigger = function (trigger) {
    var defer = $q.defer();

    $http.delete('/api/triggers/' + trigger).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeAction = function (actions, index) {

    confirm('Are you sure you want to remove this Action?').then(function () {
      actions.splice(index, 1);
    });

  };

  var openAction = function (action, title) {

    return $uibModal.open({
      animation: true,
      templateUrl: 'modules/triggers/views/triggers.action.html',
      size: 'lg',
      controller: function ($scope, $uibModalInstance, $timeout, action, devices, rooms, scenes, title) {
        $scope.action = action;
        $scope.title = title;
        $scope.builder = {};
        $scope.type_args = [];
        $scope.devices = devices;
        $scope.rooms = rooms;
        $scope.scenes = scenes;
        $scope.alerts = [];


        $scope.action_types = [
          {name: 'Device', value: 'devices', icon: 'glyphicon glyphicon-oil'},
          {name: 'Room', value: 'rooms', icon: 'glyphicon glyphicon-modal-window', capabilities: ['light', 'dimmer', 'conditioner', 'lock', 'motion_sensor']},
          {name: 'Scene', value: 'scenes', icon: 'icon-picture', capabilities: ['light']},
          {name: 'Video', value: 'video', icon: 'icon-playvideo', capabilities: ['video']},
          {name: 'Display', value: 'display', icon: 'icon-monitor', capabilities: ['display']},
        ];

        $scope.type_actions = [
          {name: 'On', value: 'on', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
          {name: 'Off', value: 'off', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
          {name: 'Motion On', value: 'motion_on', arguments: [], capabilities: ['motion_sensor']},
          {name: 'Motion Off', value: 'motion_off', arguments: [], capabilities: ['motion_sensor']},
          {name: 'Lock', value: 'lock', arguments: [], capabilities: ['lock','display']},
          {name: 'Unlock', value: 'unlock', arguments: [], capabilities: ['lock', 'display']},
          {name: 'Status', value: 'status', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
          {name: 'Level', value: 'set_level', arguments: ['level'], capabilities: ['dimmer']},
          {name: 'Mode', value: 'set_mode', arguments: ['mode'], capabilities: ['conditioner']},
          {name: 'Temperature', value: 'set_point', arguments: ['temperature'], capabilities: ['conditioner']},
          {name: 'Play', value: 'play', arguments: ['url', 'duration'], capabilities: ['video']},
          {name: 'Stop', value: 'stop', arguments: [], capabilities: ['video']},
        ];

        var get_type = function (t) {
          var matches = $scope.action_types.filter(function (i) {
            return (i.value === t);
          });

          if (matches.length === 1) {
            return matches[0];
          }
        };

        var get_action = function (t) {
          var matches = $scope.type_actions.filter(function (i) {
            return (i.value === t);
          });

          if (matches.length === 1) {
            return matches[0];
          }
        };

        var get_by = function (key, obj, match) {
          var matches = obj.filter(function (i) {
            return (i[key] === match);
          });

          if (matches.length === 1) {
            return matches[0];
          }
        };

        var parser = function () {
          if (!action.name) { return; }
          var parts = action.name.split('.');
          if (parts.length === 3) {
            if (parts[0] === 'devices') {
              $scope.builder.item = get_by('name', $scope.devices, parts[1]);
            } else if (parts[0] === 'rooms') {
              $scope.builder.item = get_by('name', $scope.rooms, parts[1]);
            } else {
              $scope.builder.item = parts[1];
            }
            $scope.builder.type = parts[0];
            $scope.builder.action = parts[2];
          } else if (parts.length === 2) {
            $scope.builder.type = parts[0];
            $scope.builder.action = parts[1];
          }

          var a = get_action($scope.builder.action);
          $scope.type_args = a.arguments;

          var a_count = -1;

          a.arguments.forEach(function (a) {
            a_count += 1;
            if (a_count < $scope.action.args.length) {
              $scope.builder[a] = $scope.action.args[a_count];
            }
          });
        };

        $timeout(parser, 500);

        $scope.changeType = function (t) {
          $scope.builder.type = t;
          $scope.builder.item = undefined;
          $scope.builder.action = undefined;
        };
        $scope.changeItem = function (i) {
          $scope.builder.item = i;
          $scope.builder.action = undefined;
        };

        $scope.change_action = function (type) {
          $scope.builder.action = type.value;
          $scope.type_args = type.arguments;
        };

        $scope.has_capability = function (c) {
          var capabilities = [];
          var type = get_type($scope.builder.type);

          if (type && type.capabilities) {
            capabilities = type.capabilities;
          } else if (type && type.value === 'devices' && $scope.builder.item) {
            capabilities = $scope.builder.item.capabilities || [];
          }

          var has = false;

          capabilities.forEach(function (capability) {
            if (c.indexOf(capability) !== -1) {
              has = true;
            }
          });

          return has;
        };

        $scope.save = function () {
          var name = [];

          var isEmpty = function(val){
              return (val === undefined || val === null || val === '') ? true : false;
          };

          if (!$scope.builder.type) {
            $scope.alerts.push({'type': 'danger', 'msg': 'Missing action type'});
            return;
          }
          name.push($scope.builder.type);

          if ($scope.builder.item) {
            name.push($scope.builder.item.name);
          }

          if (!$scope.builder.action) {
            $scope.alerts.push({'type': 'danger', 'msg': 'Missing action'});
            return;
          }
          name.push($scope.builder.action);

          var a = get_action($scope.builder.action);
          if (!a) {
            $scope.alerts.push({'type': 'danger', 'msg': 'Invalid action'});
            return;
          }

          $scope.action.args = [];

          a.arguments.forEach(function (a) {
            var v = $scope.builder[a];

            if (isEmpty(v)) {
              $scope.alerts.push({'type': 'danger', 'msg': 'Missing argument: ' + a});
            } else {
              $scope.action.args.push(v);
            }
          });


          $scope.action.name = name.join('.');
          $uibModalInstance.close($scope.action);
        };
        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

      },
      resolve: {
        action: function () {
          return action;
        },
        devices: function (Devices) {
          return Devices.query();
        },
        rooms: function (Rooms) {
          return Rooms.query();
        },
        scenes: function (Scenes) {
          return Scenes.query();
        },
        title: function () {
          return title;
        },
      }
    });

  };

  var editAction = function (action) {
    var modal = openAction(action, 'Edit Action');
    modal.result.then(function (result) {
      action = result;
    });

  };

  var addAction = function (action) {
    var modal = openAction({'arguments': []}, 'Add Action');
    action = action || [];

    modal.result.then(function (result) {
      action.push(result);
    });
  };


  var openCondition = function (condition, title) {

    return $uibModal.open({
      animation: true,
      templateUrl: 'modules/triggers/views/conditions.edit.html',
      size: 'lg',
      controller: function ($scope, $uibModalInstance, devices, rooms, scenes, title, condition) {
        $scope.title = title;
        $scope.condition = condition || {'and': [], 'or': []};
        $scope.devices = devices;
        $scope.left_capabilities = [];
        $scope.right_capabilities = [];
        $scope.rooms = rooms;
        $scope.scenes = scenes;
        $scope.condition_options = [
          {title: '<', value: 'lt'},
          {title: '≤', value: 'le'},
          {title: '=', value: 'eq'},
          {title: '≥', value: 'ge'},
          {title: '>', value: 'gt'},
          {title: '≠', value: 'ne'},
        ];

        if ($scope.condition.and && $scope.condition.and.length > 0) {
          $scope.type = 'and';
        } else if ($scope.condition.or && $scope.condition.or.length > 0) {
          $scope.type = 'or';
        } else {
          $scope.type = 'condition';
        }

        $scope.editCondition = editCondition;
        $scope.addCondition = addCondition;

        $scope.changeCondition = function (c) {
          $scope.condition.condition = c.value;
        };

        $scope.removeCondition = function (list, index) {
         list.splice(index, 1);
        };

        $scope.changeType = function (t) {
          if ($scope.type !== t) {
            $scope.type = t;
            $scope.condition = {'and': [], 'or': []};
          }
        };

        $scope.save = function () {
          if ($scope.type !== 'condition') {
            if ($scope.condition.and.length === 0 && $scope.condition.or.length === 0) {
              alert('Need at least one condition in the group');
              return;
            }

            if ($scope.condition.name === '') {
              alert('Name is required for groups');
              return;
            }
          } else {
            if ($scope.condition.left_key === undefined || $scope.condition.right_key === undefined || $scope.condition.condition === undefined) {
              console.dir($scope.condition);
              alert('All condition values required');
              return;
            }
          }
          $uibModalInstance.close($scope.condition);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };

      },
      resolve: {
        devices: function () {
          return Devices.query();
        },
        rooms: function () {
          return Rooms.query();
        },
        scenes: function () {
          return Scenes.query();
        },
        title: function () {
          return title;
        },
        condition: function () {
          return condition;
        }
      }
    });

  };


  var editCondition = function (condition) {
    var modal = openCondition(condition, 'Edit Condition');
    modal.result.then(function (result) {
      condition = result;
    });

  };

  var addCondition = function (conditions) {
    var modal = openCondition({}, 'Add Condition');
    modal.result.then(function (result) {
      conditions.push(result);
    });
  };

  return {
    'load': load,
    'add': addTrigger,
    'get': getTrigger,
    'save': saveTrigger,
    'remove': removeTrigger,
    'editAction': editAction,
    'addAction': addAction,
    'removeAction': removeAction,
    'editCondition': editCondition,
    'addCondition': addCondition,
    'types': getTypes
  };
});
