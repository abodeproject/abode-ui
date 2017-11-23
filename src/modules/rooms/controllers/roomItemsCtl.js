
var rooms = angular.module('abode.rooms');

rooms.controller('roomItemsCtl', ['$scope', '$timeout','abode', 'rooms', function ($scope, $timeout, abode, Rooms) {

  var success_splay = 1000 * 60 * Math.floor((Math.random() * 5) + 5);
  var error_splay = 1000 * Math.floor((Math.random() * 5) + 1);
  var listeners = [];
  var rooms = (Array.isArray($scope.rooms)) ? $scope.rooms : [$scope.room];

  $scope.loading = false;
  $scope.items = [];

  //If we get an EVENTS_RESET event, schedule a refresh
  var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
    listeners.forEach(function (listener) { listener(); });

    $scope.load_rooms();
  });

  $scope.load_rooms = function () {
    var i = -1;

    $scope.loading = true;
    $scope.error = false;
    $scope.items = [];

    var next = function () {
      i += 1;

      if (!rooms[i]) {
        $scope.loading = false;
        return;
      }

      Rooms.getDevices(rooms[i]).then(function (devices) {
        devices.forEach(function (device) {
          $scope.items.push(device);
        });

        next();
      }, function () {
        next();
      });
    };

    next();
  };

  $scope.hideDevice = function (device) {
    if ($scope.hideOn === undefined && $scope.hideOff === undefined) {
      return false;
    }

    return (($scope.hideOn === true && device._on) || ($scope.hideOff === true && !device._on));
  };

  $timeout($scope.load_rooms, 0);

  $scope.$on('$destroy', function () {
    listeners.forEach(function (listener) { listener(); });
    feed_detector();
  });
}]);
