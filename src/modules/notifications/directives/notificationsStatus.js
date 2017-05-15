
var notifications = angular.module('abode.notifications');

notifications.directive('notificationsStatus', [function () {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/notifications/views/status.html',
    controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
      $rootScope.notifications = $rootScope.notifications || {'hidden': false, 'notifications': []};
      $scope.notifications = $rootScope.notifications;

      $scope.showNotifications = function () {
        $rootScope.notifications.hidden = false;
      };
    }]
  };

}]);
