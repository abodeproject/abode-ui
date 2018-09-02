
var home = angular.module('abode.home');

home.directive('controller', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      type: '@',
      name: '@',
      title: '@',
      icon: '@',
      onIcon: '@',
      offIcon: '@',
      spin: '@',
      showTitle: '@',
      source: '@',
      action: '@',
      longPress: '@',
      args: '=?',
      onsuccess: '='
    },
    templateUrl: 'modules/home/views/controller.html',
    controller: ['$scope', '$timeout', '$interval', 'abode', 'Devices', 'Scenes', 'Rooms', 'Notifications', function ($scope, $timeout, $interval, abode, Devices, Scenes, Rooms, Notifications) {
      var types = {
        'devices': Devices, 'device': Devices,
        'rooms': Rooms, 'room': Rooms,
        'scenes': Scenes, 'scene': Scenes,
        'notifications': Notifications, 'notification': Notifications
      };

      var success_splay = 1000 * 60 * Math.floor((Math.random() * 5) + 5);
      var error_splay = 1000 * Math.floor((Math.random() * 5) + 1);
      var press_time = 0;
      var press_timer;

      $scope.title = $scope.title || $scope.name;
      $scope.loading = false;
      $scope.failed = false;
      $scope.error = false;
      $scope.pending = false;
      $scope.type = $scope.type || 'device';
      $scope.action = $scope.action || 'open';
      $scope.args = $scope.args || [];


      //If we get an EVENTS_RESET event, schedule a refresh
      var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
        $scope.loader = $timeout($scope.refresh, error_splay);
      });

      var event_handler = abode.scope.$on('ABODE_EVENT', function (event, msg) {

        if (!$scope.obj) {
          return;
        }

        if (msg.type === $scope.type && $scope.name === msg.name) {
          if ($scope.loader) {
            $timeout.cancel($scope.loader);
          }

          if (msg.event === 'ON' && $scope.obj._on === false)  {
            //$scope.obj._on = true;
          } else if (msg.event === 'OFF' && $scope.obj._on === true) {
            //$scope.obj._on = false;
          } else if (msg.event === 'UPDATED') {

            for (var key in msg.object) {
              if (msg.object.hasOwnProperty(key) && key[0] === '_') {
                $scope.obj[key] = msg.object[key];
              }
            }
          }

          //If we got an event, hold off on our normal refresh
          if (['toggle', 'open', 'on', 'off'].indexOf($scope.action) > -1) {
            $scope.loader = $timeout($scope.refresh, success_splay);
          }

          $scope.$digest();
        }
      });

      $scope.load = function () {
        if (!types[$scope.type]) {
          console.log('Invalid type: ', $scope.type);
          $scope.error = true;
          return;
        }
        if ($scope.loading) {
          return;
        }

        $scope.loading = true;
        $scope.error = false;

        types[$scope.type].get({'id': $scope.name}).$promise.then(function (result) {
          $scope.obj = result;
          $scope.icon = $scope.icon || $scope.obj.icon || 'icon-lightbulb-idea';
          $scope.onIcon = $scope.onIcon || $scope.icon;
          $scope.offIcon = $scope.offIcon || $scope.icon;
          if ($scope.icon.indexOf('garage') >= 0) {
            $scope.onIcon = $scope.icon;
            $scope.offIcon = $scope.icon;
          }
          $scope.loading = false;
          $scope.error = false;


          if (['toggle', 'open', 'on', 'off'].indexOf($scope.action) > -1) {
            $scope.loader = $timeout($scope.refresh, success_splay);
          }

        }, function () {
          $scope.loading = false;
          $scope.error = true;

          //If we got an error, try again in 5 seconds
          $scope.loader = $timeout($scope.load, error_splay);
        });
      };

      $scope.refresh = function () {
        if (!$scope.obj || $scope.loading) {
          return;
        }

        $scope.loading = true;
        $scope.error = false;

        $scope.obj.$refresh().then(function () {
          $scope.loading = false;
          $scope.error = false;

          $scope.loader = $timeout($scope.refresh, success_splay);
        }, function () {
          $scope.loading = false;
          $scope.error = true;

          $scope.loader = $timeout($scope.refresh, error_splay);
        });
      };

      $scope.start = function () {
        press_time = new Date();
        press_time = press_time.getTime();

        press_timer = $timeout(function () {
          $scope.do_action($scope.longPress || $scope.action);
        }, 2000);
      };

      $scope.stop = function () {
        var now = new Date();
        now = now.getTime();

        $timeout.cancel(press_timer);

        if (now - press_time <= 500) {
          $scope.do_action($scope.action);
        } else {
          $scope.do_action($scope.longPress || $scope.action);
        }
      };

      $scope.do_action = function (action) {
        if (!$scope.obj || $scope.failed) {
          $scope.failed = true;
          $timeout(function () {
            $scope.failed = false;
          }, 2000);

          return;
        }

        var func;

        if ($scope.loader) {
          $timeout.cancel($scope.loader);
        }
        $scope.failed = false;

        if (action === 'toggle') {
          func = ($scope.obj._on || $scope.obj._lights_on) ? $scope.obj.$off : $scope.obj.$on;
        } else if ($scope.obj['$' + action]) {
          func = $scope.obj['$' + action];
        } else if (action === 'open_controls') {
          func = function () {
            return $scope.obj.$open(true);
          };
        } else {
          func = $scope.obj.$open;
        }

        $scope.pending = true;
        var result = func.apply($scope.obj, $scope.args);
        if (result && result.then) {
            result.then(function () {
            $scope.pending = false;
            $scope.success = true;
            if (action === 'toggle' || action === 'open' || action === 'on' || action === 'toggle') {
              $scope.loader = $timeout($scope.refresh, 5000);
            }
            if ($scope.onsuccess) {
              $scope.onsuccess();
            }
            $timeout(function () {
              $scope.success = false;
            }, 4000);
          }, function (err) {
            $scope.pending = false;
            $scope.failed = true;
            if (action === 'toggle' || action === 'open' || action === 'on' || action === 'toggle') {
              $scope.loader = $timeout($scope.refresh, 5000);
            }
            $timeout(function () {
              $scope.failed = false;
            }, 4000);
          });
        } else if (result && result.closed) {
            $scope.pending = false;
            $scope.loading = true;
            if (action === 'toggle' || action === 'open' || action === 'on' || action === 'toggle') {
              $scope.loader = $timeout($scope.refresh, 5000);
            }
            result.closed.then(function (result) {
              if ($scope.onsuccess) {
                $scope.onsuccess();
              }
              $scope.loading = false;
            });
        } else {
          if (action === 'toggle' || action === 'open' || action === 'on' || action === 'toggle') {
            $scope.loader = $timeout($scope.refresh, 5000);
          }
          $scope.pending = false;
        }
      };

      $scope.loader = $timeout($scope.load, 100);

      $scope.$on('$destroy', function () {
        event_handler();
        feed_detector();
        $timeout.cancel($scope.loader);
      });

    }]
  };
}]);
