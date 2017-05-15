
var rooms = angular.module('abode.rooms');

rooms.controller('roomsAdd', function ($scope, $state, abode, Rooms) {
  $scope.room = new Rooms();
  $scope.alerts = [];

  $scope.back = function () {
    $state.go('main.rooms');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.add = function () {
    $scope.room.$save().then(function () {
      abode.message({'type': 'success', 'message': 'Room Added'});
      $scope.room = new Rooms();
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to add Room', 'details': err});
      $scope.errors = err;
    });
  };
});
