
var triggers = angular.module('abode.triggers');

triggers.controller('triggersEdit', function ($scope, $state, $uibModal, abode, triggers, trigger, Devices, Rooms, Scenes, Pins, confirm, types) {
  $scope.trigger = trigger;
  $scope.alerts = [];
  $scope.state = $state;
  $scope.trigger_types = types;
  $scope.devices = [];
  $scope.scenes = [];
  $scope.conditions = false;
  $scope.delay = ($scope.trigger.delay && $scope.trigger.delay.time > 0) ? true : false;
  $scope.duration = ($scope.trigger.duration && $scope.trigger.duration.time > 0) ? true : false;
  $scope.devices_loading = true;
  $scope.section = 'general';
  $scope.notifications = [];

  $scope.addAction = triggers.addAction;
  $scope.editAction = triggers.editAction;
  $scope.removeAction = triggers.removeAction;

  $scope.match_types = [
    {name: 'None', value: '', icon: 'glyphicon glyphicon-ban-circle'},
    {name: 'Device', value: 'device', icon: 'glyphicon glyphicon-oil'},
    {name: 'Room', value: 'room', icon: 'glyphicon glyphicon-modal-window'},
    {name: 'Scene', value: 'scene', icon: 'icon-picture'},
    {name: 'Pin', value: 'pin', icon: 'icon-passwordalt'},
    {name: 'Time', value: 'time', icon: 'icon-clockalt-timealt'},
    {name: 'Date', value: 'date', icon: 'icon-calendar'},
    {name: 'String', value: 'string', icon: 'icon-quote'},
    {name: 'Number', value: 'number', icon: 'icon-infinityalt'}
  ];

  $scope.load_notifications = function () {
    $scope.loading = true;
    $scope.trigger.$notifications().then(function (results) {
      $scope.loading = false;
      $scope.notifications = results;

    }, function () {
      $scope.loading = false;
    });
  };

  $scope.load_notifications();

  $scope.check = function () {
    var checker = $uibModal.open({
      animation: false,
      size: 'lg',
      templateUrl: 'modules/triggers/views/triggers.checker.html',
      controller: ['$scope', '$uibModalInstance', '$timeout', 'trigger', function ($scope, $uibModalInstance, $timeout, trigger) {
        $scope.loading = true;
	      $scope.results = {};

        $scope.check = function () {
          $scope.loading = true;
          trigger.$check().then(function (results) {
            $scope.loading = false;
            $scope.results = results;
          }, function (results) {
            $scope.loading = false;
            $scope.results = results;
          });
        };

        $scope.close = function () {
          $uibModalInstance.dismiss();
        };

        $timeout($scope.check, 1000);
      }],
      resolve: {
        trigger: function () {
          return $scope.trigger;
        }
      }
    });
  };

  $scope.add_notification = function () {
    var picker = $uibModal.open({
      animation: false,
      templateUrl: 'modules/triggers/views/notifications.picker.html',
      size: 'sm',
      controller: ['$scope', '$uibModalInstance', 'Notifications', 'trigger', function ($scope, $uibModalInstance, Notifications, trigger) {
        $scope.loading = true;
        $scope.notifications = [];
        $scope.trigger = trigger;

        $scope.close = function () {
          $uibModalInstance.dismiss();
        };

        $scope.select = function(notification) {
          if (!$scope.trigger._id) {
            $uibModalInstance.close(notification);
          } else {
            $scope.trigger.$add_notification(notification).then(function () {
              $uibModalInstance.close(notification);
            }, function () {
              abode.message({'type': 'failed', 'message': 'Failed to add notification'});
            });
          }
        };

        Notifications.query().$promise.then(function (results) {
          $scope.notifications = results;
          $scope.loading = false;
        });
      }],
      resolve: {
        trigger: function () {
          return $scope.trigger;
        }
      }
    });

    picker.result.then(function (notification) {
      $scope.trigger.notifications.push(notification._id);
      $scope.notifications.push(notification);
    });
  };

  $scope.remove_notification = function (notification) {
    if (!$scope.trigger._id) {

      $scope.trigger.notifications.splice($scope.trigger.notifications.indexOf(notification._id), 1);
      $scope.notifications = $scope.notifications.filter(function (item) {
        return (item._id !== notification._id);
      });

    } else {

      $scope.trigger.$remove_notification(notification).then(function () {
        $scope.trigger.notifications.splice($scope.trigger.notifications.indexOf(notification._id), 1);
        $scope.load_notifications();
        abode.message({'type': 'success', 'message': 'Notification Removed'});
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove notification'});
      });

    }
  };

  var getDevices = function () {
    $scope.devices_loading = true;
    Devices.query().$promise.then(function (devices) {
      $scope.devices = devices;
      $scope.devices_loading = false;
    }, function () {
      $scope.devices = [];
      $scope.devices_loading = false;
    });
  };

  var getRooms = function () {
    $scope.rooms_loading = true;
    Rooms.query().$promise.then(function (rooms) {
      $scope.rooms = rooms;
      $scope.rooms_loading = false;
    }, function () {
      $scope.rooms = [];
      $scope.rooms_loading = false;
    });
  };

  var getScenes = function () {
    $scope.scenes_loading = true;
    Scenes.query().$promise.then(function (scenes) {
      $scope.scenes = scenes;
      $scope.scenes_loading = false;
    }, function () {
      $scope.scenes = [];
      $scope.scenes_loading = false;
    });
  };
  var getPins = function () {
    $scope.pins_loading = true;
    Pins.query().$promise.then(function (pins) {
      $scope.pins = pins;
      $scope.pins_loading = false;
    }, function () {
      $scope.pins = [];
      $scope.pins_loading = false;
    });
  };

  getDevices();
  getRooms();
  getScenes();
  getPins();

  $scope.$watch('delay', function (type) {
    if (!type) {
      $scope.trigger.delay = {};
    }
  });

  $scope.$watch('duration', function (type) {
    if (!type) {
      $scope.trigger.duration = {'actions': [], 'triggers': []};
    }
  });

  $scope.$watch('trigger.match_type', function (type) {
    if (type === 'device' && $scope.devices.length === 0) {
      getDevices();
    }
    if (type === 'rooms' && $scope.devices.length === 0) {
      getRooms();
    }
  });

  $scope.changeType = function (type) {
    $scope.trigger.match_type = type;
    $scope.trigger.match = '';
  };

  $scope.changeDevice = function (device) {
    trigger.match = device.name;
  };

  $scope.changeRoom = function (room) {
    trigger.match = room.name;
  };

  $scope.changeScene = function (scene) {
    trigger.match = scene.name;
  };

  $scope.changePin = function (pin) {
    trigger.match = pin.name;
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.save = function () {
    $scope.trigger.trigger = '';
    $scope.trigger.match_type = '';
    $scope.trigger.match = '';

    $scope.trigger.$update().then(function () {
      abode.message({'type': 'success', 'message': 'Trigger Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Trigger', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.add = function () {
    $scope.trigger.$save().then(function () {
      abode.message({'type': 'success', 'message': 'Trigger Added'});
      $state.go('^.list');
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to add Trigger', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Trigger?').then(function () {
      $scope.trigger.$remove().then(function () {
        $state.go('index.triggers');
      }, function (err) {
        $scope.alerts = [{'type': 'danger', 'msg': 'Failed to remove Trigger'}];
        $scope.errors = err;
      });
    });
  };
});
