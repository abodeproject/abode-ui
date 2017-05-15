
var notifications = angular.module('abode.notifications');

notifications.directive('notifications', [function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      'view': '@'
    },
    controller: ['$rootScope', '$scope', '$timeout', '$q', 'abode', 'Notifications', function ($rootScope, $scope, $timeout, $q, abode, Notifications) {
      var auto_hide_timer;
      var success_splay = 1000 * 60 * Math.floor((Math.random() * 5) + 5);
      var error_splay = 1000 * Math.floor((Math.random() * 5) + 1);

      $scope.loader = false;
      $scope.loading = false;
      $scope.error = false;

      $rootScope.notifications = $rootScope.notifications || {'hidden': true, 'notifications': []};
      $scope.notifications = $rootScope.notifications;
      $rootScope.notifications.hidden = true;
      abode.config.auth.device.config.events_auto_hide = abode.config.auth.device.config.events_auto_hide || 5;

      //If we get an EVENTS_RESET event, schedule a refresh
      var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
        $scope.loader = $timeout($scope.refresh, error_splay);
      });

      //If we get an EVENTS_RESET event, schedule a refresh
      var feed_activated = abode.scope.$on('NOTIFICATION_ACTIVATED', function (event, msg) {
        if (!notificationInResults(msg.object, $rootScope.notifications.notifications)) {
          $rootScope.notifications.notifications.unshift(new Notifications(msg.object));

          if (abode.config.auth.device.config.show_events === true) {
            $rootScope.notifications.hidden = false;
            $scope.auto_hide();
          }
        }
      });

      //If we get an EVENTS_RESET event, schedule a refresh
      var feed_deactivated = abode.scope.$on('NOTIFICATION_DEACTIVATED', function (event, msg) {
        for (i=$rootScope.notifications.notifications.length; i > 0; i-- ) {
          if (notificationInResults(msg.object, $rootScope.notifications.notifications)) {
            $rootScope.notifications.notifications.splice(i - 1, 1);
          }
        }

        if ($rootScope.notifications.notifications.length === 0) {
          $rootScope.notifications.hidden = true;
          $scope.stop_auto_hide();
        }
      });

      $scope.stop_auto_hide = function () {

        if (auto_hide_timer) {
          $timeout.cancel(auto_hide_timer);
        }

      };

      $scope.auto_hide = function(cancel) {

        var timer = (abode.config.auth.device.config.events_auto_hide) ? (1000 * 60 * abode.config.auth.device.config.events_auto_hide) : (1000 * 60 * 5);

        $scope.stop_auto_hide();

        auto_hide_timer = $timeout(function () {
          $rootScope.notifications.hidden = true;
        }, timer);

      };

      $scope.dismissAll = function () {
        var defers = [];

        $rootScope.notifications.notifications.forEach(function (notification) {
          defers.push(notification.$deactivate());
        });

        $q.all(defers).then(function () {
          $scope.refresh();
        });
      };

      var notificationInResults = function (notification, results) {
        var match = results.filter(function (n) {
          return (n._id === notification._id);
        });

        return (match.length > 0);
      };

      $scope.refresh = function () {
        if ($scope.loading) {
          return;
        }

        $scope.loading = true;

        Notifications.active().$promise.then(function (results) {
          var i,
            additions = false;

          if (results.length !== 0 && results.length !== $rootScope.notifications.notifications.length) {
            $rootScope.breakIdle();
          }
          $scope.loading = false;
          //$scope.loader = $timeout($scope.refresh, 5000);

          //Check if existing notifications are still active, remove if not
          for (i=$rootScope.notifications.notifications.length; i > 0; i-- ) {
            if (!notificationInResults($rootScope.notifications.notifications[i - 1], results)) {
              $rootScope.notifications.notifications.splice(i - 1, 1);
            }
          }

          //Check if any new notifications should be added
          results.forEach(function (notification) {
            if (!notificationInResults(notification, $rootScope.notifications.notifications)) {
              $rootScope.notifications.notifications.unshift(notification);
              additions = true;
            }
          });

          if (additions) {
            if (abode.config.auth.device.config.show_events === true) {
              $rootScope.notifications.hidden = false;
              $scope.auto_hide();
            }
            if ($rootScope.notifications.notifications.length === 0) {
              $rootScope.notifications.hidden = true;
              $scope.stop_auto_hide();
            }
          }

        }, function () {
          $scope.loading = false;
          //$scope.loader = $timeout($scope.refresh, 10000);
        });
      };

      $scope.dismiss = function () {
        $scope.refresh();
      };

      $scope.hide = function () {
        $rootScope.notifications.hidden = true;
        $scope.stop_auto_hide();
      };

      //$scope.loader = $timeout($scope.refresh, 5000);
      $scope.refresh();

      $scope.$on('$destroy', function () {
        feed_detector();
        feed_activated();
        feed_deactivated();

        $scope.stop_auto_hide();
        $timeout.cancel($scope.loader);
      });
    }],
    templateUrl: 'modules/notifications/views/index.html'
  };
}]);
