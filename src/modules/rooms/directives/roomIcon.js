
var rooms = angular.module('abode.rooms');

rooms.directive('roomIcon', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'left': '@',
      'right': '@',
      'top': '@',
      'bottom': '@',
      'width': '@',
      'height': '@',
      'align': '@',
      'size': '@',
      'room': '=?',
      'name': '@',
      'title': '@',
      'id': '@',
      'icon': '@',
      'tempType': '@',
      'interval': '@',
      'source': '@',
    },
    templateUrl: 'modules/rooms/views/room.icon.html',
    controller: function ($scope, $interval, $timeout, $rootScope, abode, rooms, Rooms) {

      $scope.loading = false;
      $scope.error = false;
      $scope.styles =  {};

      var success_splay = 1000 * 60 * Math.floor((Math.random() * 5) + 5);
      var error_splay = 1000 * Math.floor((Math.random() * 5) + 1);

      //If we get an EVENTS_RESET event, schedule a refresh
      var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
        if ($scope.loader) {
          $timeout.cancel($scope.loader);
        }

        $scope.loader = $timeout($scope.refresh, error_splay);
      });

      //If we get an EVENTS_RESET event, schedule a refresh
      var room_events = abode.scope.$on('UPDATED', function (event, msg) {
        if (msg.type === 'room' && $scope.room && msg.object._id === $scope.room._id) {
          if ($scope.loader) {
            $timeout.cancel($scope.loader);
          }

          if (!$scope.icon && msg.object.icon) {
            $scope.icon = msg.object.icon;
            $scope.show_icon = true;
          }

          angular.merge($scope.room, msg.object);
          $scope.loader = $timeout($scope.refresh, success_splay);
        }
      });

      //Build our styles
      if ($scope.left !== undefined || $scope.right !== undefined || $scope.top !== undefined || $scope.bottom !== undefined) {
        $scope.styles.position = 'absolute';
      }
      if ($scope.left) { $scope.styles.left = $scope.left + 'em'; }
      if ($scope.right) { $scope.styles.right = $scope.right + 'em'; }
      if ($scope.top) { $scope.styles.top = $scope.top + 'em'; }
      if ($scope.bottom) { $scope.styles.bottom = $scope.bottom + 'em'; }

      if ($scope.width) { $scope.styles.width = $scope.width + 'em'; }
      if ($scope.height) { $scope.styles.height = $scope.height + 'em'; }
      if ($scope.align) { $scope.styles['text-align'] = $scope.align; }
      if ($scope.size) { $scope.styles['font-size'] = $scope.size + 'em'; }

      if ($scope.icon) { $scope.show_icon = true; }

      //Room view function
      $scope.view = function () {
        if ($scope.opening) {
          console.log('already open');
          return;
        }

        $scope.opening = true;
        rooms.view($scope.room, $scope.devices).result.then(function () {
          $scope.opening = false;
        }, function () {
          $scope.opening = false;
        })
      };

      //Loader function
      $scope.load = function () {
        if ($scope.loading) {
          return;
        }

        $scope.loading = true;
        $scope.error = false;

        Rooms.get({'id': $scope.id || $scope.name || $scope.room._id || $scope.room}).$promise.then(function (obj) {
          $scope.loading = false;
          $scope.error = false;
          $scope.room = obj;

          if (!$scope.icon && obj.icon) {
            $scope.icon = obj.icon;
            $scope.show_icon = true;
          }

          $scope.loader = $timeout($scope.refresh, success_splay);
        }, function (err) {
          $scope.loading = false;
          $scope.error = true;
        });
      };

      //Loader function
      $scope.refresh = function () {
        if ($scope.loading) {
          return;
        }

        $scope.loading = true;
        $scope.error = false;

        $scope.room.$refresh().then(function () {
          $scope.loading = false;
          $scope.error = false;

          $scope.loader = $timeout($scope.refresh, success_splay);
        }, function () {
          $scope.loading = false;
          $scope.error = true;

          $scope.loader = $timeout($scope.refresh, error_splay);
        });
      };

      $scope.loader = $timeout($scope.load, 100);

      $scope.motion_fader = $interval(function () {
        var now = new Date(),
          off_age = (now - new Date($scope.room._last_motion_off)) / 1000 / 60;

        if ($scope.room._motion_on) {
          $scope.motion_class = '';
          return;
        }
        
        if (off_age > 64) {
          $scope.motion_class = '';
        } else if (off_age > 32) {
          $scope.motion_class = 'motion32';
        } else if (off_age > 16) {
          $scope.motion_class = 'motion16';
        } else if (off_age > 8) {
          $scope.motion_class = 'motion8';
        } else if (off_age > 4) {
          $scope.motion_class = 'motion4';
        } else if (off_age > 2) {
          $scope.motion_class = 'motion2';
        } else if (off_age >= 0) {
          $scope.motion_class = 'motion0';
        }
        console.dir($scope.motion_class);
      }, 1000);

      $scope.$on('$destroy', function () {
        //Kill our even listeners
        room_events();
        feed_detector();

        $interval.cancel($scope.motion_fader);
        // Kill our loader timeout if active
        if ($scope.loader) {
          $timeout.cancel($scope.loader);
        }
      });
    },
    replace: true
  };

});
