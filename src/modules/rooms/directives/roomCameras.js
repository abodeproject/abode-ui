
var rooms = angular.module('abode.rooms');

rooms.directive('roomCameras', function () {

  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      'devices': '=',
      'source': '=',
    },
    templateUrl: 'modules/rooms/views/rooms.cameras.html',
    controller: function ($scope, abode, devices) {
      var source_uri = ($scope.source === undefined) ? '/api' : '/api/sources/' + $scope.source;
      var random = new Date();

      $scope.devices = $scope.devices || [];
      $scope.cameras = [];
      $scope.index = 0;


      var parseDevices = function () {
        var cameras = [];
        $scope.devices.forEach(function (device) {
          if (device.config.image_url) {
            var camera = {
              '_id': device._id,
              'name': device.name,
              'image': device.$image_url(),
            };

            if (device.config.video_url) {
              camera.video = device.$video_url();
            }

            cameras.push(camera);
          }
        });

        $scope.cameras = cameras;
      };

      $scope.next = function () {
        if ($scope.index >= $scope.cameras.length - 1) {
          $scope.index = 0;
        } else {
          $scope.index += 1;
        }
      };

      $scope.previous = function () {
        if ($scope.index === 0) {
          $scope.index = $scope.cameras.length - 1;
        } else {
          $scope.index -= 1;
        }
      };

      $scope.reload = function (index) {
        random = new Date();
        var device = $scope.devices.filter(function (d) { return d._id === $scope.cameras[$scope.index]._id; });

        if (device[0]) {
          $scope.cameras[$scope.index].image = device[0].$image_url();
        }
      };


      $scope.play = function () {
        var camera = $scope.cameras[$scope.index];
        var device = $scope.devices.filter(function (dev) { return dev._id === camera._id; });

        devices.openCamera(device[0], $scope.source);
      };

      $scope.$watch('devices', function () {
        if ($scope.cameras.length !== 0 ) { return; }
        parseDevices();
      });

    }
  };
});
