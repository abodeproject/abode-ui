var notifications = angular.module('abode.notifications', ['ngResource']);

notifications.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/notifications', '/notifications/list');

  $stateProvider
  .state('main.notifications', {
    url: '/notifications',
    templateUrl: '/views/notifications/notifications.html',
  })
  .state('main.notifications.list', {
    url: '/list',
    templateUrl: '/views/notifications/notifications.list.html',
    controller: 'notificationsList'
  })
  .state('main.notifications.add', {
    url: '/add',
    templateUrl: '/views/notifications/notifications.add.html',
    controller: 'notificationsAdd'
  })
  .state('main.notifications.edit', {
    url: '/:id',
    templateUrl: '/views/notifications/notifications.edit.html',
    controller: 'notificationsEdit',
    resolve: {
      'notification': ['$stateParams', '$state', 'Notifications', function ($stateParams, $state, Notifications) {

        return Notifications.get({'id': $stateParams.id}).$promise;

      }]
    }
  });
});

notifications.factory('Notifications', ['$resource', '$http', '$q', '$uibModal', 'abode', function ($resource, $http, $q, $uibModal, abode) {

  var model = $resource(abode.url('/api/notifications/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'refresh': { method: 'GET' },
    'active': { method: 'GET', isArray: true, params: {'id': 'active'} },
  });

  model.prototype.$deactivate = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/deactivate').value();

    $http.post(url).then(function () {
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$triggers = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/triggers').value();

    $http.get(url).then(function (results) {
      defer.resolve(results.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$add_trigger = function (trigger) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/triggers').value();

    $http.post(url, {'_id': trigger._id || trigger}).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$remove_trigger = function (trigger) {
    var self = this,
      defer = $q.defer(),
      trigger_id = trigger._id || trigger;
      url = abode.url('/api/notifications/' + this._id + '/triggers/' + trigger_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$add_action = function (action) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/notifications/' + this._id + '/actions').value();

    $http.post(url, action).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  model.prototype.$remove_action = function (action) {
    var self = this,
      defer = $q.defer(),
      action_id = action._id || action;
      url = abode.url('/api/notifications/' + this._id + '/actions/' + action_id).value();

    $http.delete(url).then(function (results) {
      defer.resolve();
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;

}]);



notifications.directive('notifications', [function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      'view': '@'
    },
    controller: ['$rootScope', '$scope', '$interval', '$q', 'abode', 'Notifications', function ($rootScope, $scope, $interval, $q, abode, Notifications) {
      $scope.notifications = [];
      $scope.loader = false;
      $scope.loading = false;
      $scope.error = false;

      $scope.dismissAll = function () {
        var defers = [];

        $scope.notifications.forEach(function (notification) {
          defers.push(notification.$deactivate());
        });

        $q.all(defers).then(function () {
          $scope.refresh();
        });
      };

      $scope.refresh = function () {
        if ($scope.loading) {
          return;
        }

        $scope.loading = true;

        Notifications.active().$promise.then(function (results) {
          if (results.length !== 0 && results.length !== $scope.notifications.length) {
            $rootScope.breakIdle();
          }
          $scope.loading = false;
          $scope.notifications = results;
        }, function () {
          $scope.loading = false;
        });
      };

      $scope.dismiss = function () {
        $scope.refresh();
      };

      $scope.loader = $interval($scope.refresh, 5000);
      $scope.refresh();

      $scope.$on('$destroy', function () {
        $interval.cancel($scope.loader);
      });
    }],
    templateUrl: 'views/notifications/index.html'
  };
}]);

notifications.controller('notificationsList', ['$scope', 'Notifications', function ($scope, Notifications) {

  $scope.notifications = Notifications.query();

  $scope.add = function () {

  };

}]);

notifications.controller('notificationsAdd', ['$scope', '$state', 'abode', 'Notifications', function ($scope, $state, abode, Notifications) {

  $scope.saving = false;
  $scope.notification = new Notifications({'actions': [], 'triggers': []});


  $scope.add = function () {
    $scope.saving = true;

    $scope.notification.$save().then(function () {
      $scope.saving = false;
      abode.message({'type': 'success', 'message': 'Notification Added'});

      $state.go('^.list');
    }, function (err) {
      $scope.saving = false;
      abode.message({'type': 'failed', 'message': 'Failed to Add Notification', 'details': err});
      $scope.errors = err;
    });

  };

}]);

notifications.controller('notificationsEdit', ['$scope', '$state', '$uibModal', 'abode', 'notification', function ($scope, $state, $uibModal, abode, notification) {

  $scope.notification = notification;
  $scope.saving = false;
  $scope.deleting = false;
  $scope.loading = false;

  $scope.load_triggers = function () {
    $scope.loading = true;
    $scope.notification.$triggers().then(function (results) {
      $scope.loading = false;
      $scope.triggers = results;

    }, function () {
      $scope.loading = false;
    });
  };

  $scope.load_triggers();

  $scope.add_action = function () {
    var picker = $uibModal.open({
      animation: false,
      templateUrl: 'views/notifications/action.builder.html',
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
          {name: 'Room', value: 'rooms', icon: 'glyphicon glyphicon-modal-window', capabilities: ['light', 'dimmer', 'conditioner']},
          {name: 'Scene', value: 'scenes', icon: 'icon-picture', capabilities: ['light']},
        ];

        $scope.type_actions = [
          {name: 'On', value: 'on', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
          {name: 'Off', value: 'off', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
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
    })
  };

  $scope.add_trigger = function () {
    var picker = $uibModal.open({
      animation: false,
      templateUrl: 'views/notifications/triggers.picker.html',
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
    })
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
