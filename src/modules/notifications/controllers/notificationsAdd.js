
var notifications = angular.module('abode.notifications');

notifications.controller('notificationsAdd', ['$scope', '$state', 'abode', 'Notifications', function ($scope, $state, abode, Notifications) {

  $scope.saving = false;
  $scope.notification = new Notifications({'actions': [], 'triggers': [], 'check_threshold': 1, 'hold_off_time': 10, 'expire_after': 0, 'push': true});


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
