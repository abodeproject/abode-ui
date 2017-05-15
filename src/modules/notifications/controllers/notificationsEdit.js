
var notifications = angular.module('abode.notifications');

notifications.controller('notificationsEdit', ['$scope', '$state', '$uibModal', 'abode', 'notification', function ($scope, $state, $uibModal, abode, notification) {

  $scope.notification = notification;
  $scope.saving = false;
  $scope.deleting = false;
  $scope.loading = false;
  $scope.action = {};

  //If we get an EVENTS_RESET event, schedule a refresh
  var feed_activated = abode.scope.$on('UPDATED', function (event, msg) {
    if (msg.type === 'notification' && msg.object._id === $scope.notification._id) {
      angular.merge($scope.notification, msg.object);
    }
  });

  $scope.load_triggers = function () {
    $scope.loading = true;
    $scope.notification.$triggers().then(function (results) {
      $scope.loading = false;
      $scope.triggers = results;

    }, function () {
      $scope.loading = false;
    });
  };

  $scope.activate = function () {
    $scope.action.status = 'pending';
    $scope.notification.$activate().then(function () {
      $scope.notification.active = true;
      $scope.action.status = 'success';
      $scope.action.message = 'Notification activated';
    }, function (err) {
      $scope.action.status = 'error';
      $scope.action.message = err.message;
    });
  };

  $scope.deactivate = function () {
    $scope.action.status = 'pending';
    $scope.notification.$deactivate().then(function () {
      $scope.notification.active = false;
      $scope.action.status = 'success';
      $scope.action.message = 'Notification de-activated';
    }, function (err) {
      $scope.action.status = 'error';
      $scope.action.message = err.message;
    });
  };

  $scope.reset = function () {
    $scope.action.status = 'pending';
    $scope.notification.$reset().then(function () {
      $scope.action.status = 'success';
      $scope.action.status = 'Notification reset';
    }, function (err) {
      $scope.action.status = 'error';
      $scope.action.message = err;
    });
  };

  $scope.load_triggers();

  $scope.add_action = function () {
    var picker = $uibModal.open({
      animation: false,
      templateUrl: 'modules/notifications/views/action.builder.html',
      size: 'lg',
      controller: ['$scope', '$uibModalInstance', 'Devices', 'Scenes', 'Rooms', 'notification', function ($scope, $uibModalInstance, Devices, Scenes, Rooms, notification) {
        $scope.loading = true;
        $scope.action = {};
        $scope.notification = notification;
        $scope.devices = Devices.query();
        $scope.scenes = Scenes.query();
        $scope.rooms = Rooms.query();
        $scope.item = {};
        $scope.type_args = [];

        $scope.action_types = [
          {name: 'Device', value: 'devices', icon: 'glyphicon glyphicon-oil'},
          {name: 'Room', value: 'rooms', icon: 'glyphicon glyphicon-modal-window', capabilities: ['light', 'dimmer', 'conditioner', 'lock']},
          {name: 'Scene', value: 'scenes', icon: 'icon-picture', capabilities: ['light']},
        ];

        $scope.type_actions = [
          {name: 'On', value: 'on', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff','motion_sensor']},
          {name: 'Off', value: 'off', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff','motion_sensor']},
          {name: 'Lock', value: 'lock', arguments: [], capabilities: ['lock']},
          {name: 'Unlock', value: 'unlock', arguments: [], capabilities: ['lock']},
          {name: 'Open', value: 'on', arguments: [], capabilities: ['door','window']},
          {name: 'Close', value: 'off', arguments: [], capabilities: ['door','window']},
          {name: 'Level', value: 'set_level', arguments: ['level'], capabilities: ['dimmer']},
          {name: 'Status', value: 'status', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
          {name: 'Mode', value: 'set_mode', arguments: ['mode'], capabilities: ['conditioner']},
          {name: 'Temperature', value: 'set_point', arguments: ['temperature'], capabilities: ['conditioner']},
        ];

        $scope.changeType = function (t) {
          $scope.action.type = t;
        };

        $scope.changeItem = function (i) {
          $scope.item = i;
          $scope.action.name = i.name;
        };

        $scope.change_action = function(a) {
          $scope.action.action = a.value;
          $scope.type_args = a.arguments;
          $scope.action.args = [];
        };

        var get_type = function (t) {
          var matches = $scope.action_types.filter(function (i) {
            return (i.value === t);
          });

          if (matches.length === 1) {
            return matches[0];
          }
        };

        $scope.has_capability = function (c) {
          var capabilities = [];
          var type = get_type($scope.action.type);

          if (type && type.capabilities) {
            capabilities = type.capabilities;
          } else if (type && type.value === 'devices' && $scope.action.name) {
            capabilities = $scope.item.capabilities || [];
          }

          var has = false;

          capabilities.forEach(function (capability) {
            if (c.indexOf(capability) !== -1) {
              has = true;
            }
          });

          return has;
        };

        $scope.close = function () {
          $uibModalInstance.dismiss();
        };

        $scope.save = function() {
          $scope.notification.$add_action($scope.action).then(function (result) {
            $uibModalInstance.close(result);
            abode.message({'type': 'success', 'message': 'Action Added'});
          }, function () {
            abode.message({'type': 'failed', 'message': 'Failed to add trigger'});
          });
        };
      }],
      resolve: {
        notification: function () {
          return $scope.notification;
        }
      }
    });

    picker.result.then(function (action) {
      console.dir(action);
      $scope.notification.actions.push(action);
    });
  };

  $scope.remove_action = function (action) {
    $scope.notification.$remove_action(action).then(function () {
      $scope.notification.actions.splice($scope.notification.actions.indexOf(action), 1);
      abode.message({'type': 'success', 'message': 'Action Removed'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to remove action'});
    });
  };

  $scope.add_trigger = function () {
    var picker = $uibModal.open({
      animation: false,
      templateUrl: 'modules/notifications/views/triggers.picker.html',
      size: 'sm',
      controller: ['$scope', '$uibModalInstance', 'Triggers', 'notification', function ($scope, $uibModalInstance, Triggers, notification) {
        $scope.loading = true;
        $scope.triggers = [];
        $scope.notification = notification;

        $scope.close = function () {
          $uibModalInstance.dismiss();
        };

        $scope.select = function(trigger) {
          $scope.notification.$add_trigger(trigger).then(function () {
            $uibModalInstance.close(trigger);
          }, function () {
            abode.message({'type': 'failed', 'message': 'Failed to add trigger'});
          });
        };

        Triggers.query().$promise.then(function (results) {
          $scope.triggers = results;
          $scope.loading = false;
        });
      }],
      resolve: {
        notification: function () {
          return $scope.notification;
        }
      }
    });

    picker.result.then(function (trigger) {
      $scope.notification.triggers.push(trigger._id);
      $scope.load_triggers();
    });
  };

  $scope.remove_trigger = function (trigger) {
    $scope.notification.$remove_trigger(trigger).then(function () {
      $scope.load_triggers();
      $scope.notification.triggers.splice($scope.notification.triggers.indexOf(trigger._id), 1);
      abode.message({'type': 'success', 'message': 'Trigger Removed'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to remove trigger'});
    });
  };

  $scope.save = function () {
    $scope.saving = true;

    $scope.notification.$update().then(function () {
      $scope.saving = false;
      abode.message({'type': 'success', 'message': 'Notification Updated'});
    }, function (err) {
      $scope.saving = false;
      abode.message({'type': 'failed', 'message': 'Failed to Update Notification', 'details': err});
      $scope.errors = err;
    });

  };

  $scope.delete = function () {

    $scope.deleting = true;

    $scope.notification.$delete().then(function () {
      $scope.deleting = false;
      abode.message({'type': 'success', 'message': 'Notification Deleted'});

      $state.go('^.list');
    }, function (err) {
      $scope.deleting = false;
      abode.message({'type': 'failed', 'message': 'Failed to Delete Notification', 'details': err});
      $scope.errors = err;
    });
  };

}]);
