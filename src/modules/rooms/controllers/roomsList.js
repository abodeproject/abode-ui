
var rooms = angular.module('abode.rooms');

rooms.controller('roomsList', function ($scope, $state, Rooms) {
  $scope.rooms = [];
  $scope.loading = true;

  $scope.view = function (room) {
    room.$open();
  };

  $scope.edit = function (room) {
    $state.go('main.rooms.edit', {'name': room.name});
  };

  $scope.load = function () {
    Rooms.query().$promise.then(function (results) {
      $scope.rooms = results;
      $scope.loading = false;
      $scope.error = false;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };



  $scope.load();
});
