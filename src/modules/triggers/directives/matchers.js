
var triggers = angular.module('abode.triggers');

triggers.directive('triggerMatchers', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    transclude: true,
    scope: {
      'ngModel': '=',
    },
    controller: function ($scope, $uibModal, triggers, confirm) {

      var openMatcher = function (matcher) {
        var modal = $uibModal.open({
          animation: true,
          templateUrl: 'modules/triggers/views/triggers.matchers.matcher.html',
          size: 'lg',
          controller: function ($scope, $uibModalInstance, matcher, devices, rooms, scenes, types) {
            $scope.matcher = matcher;
            $scope.trigger_types = types;
            $scope.match_types = [
              {name: 'None', value: '', icon: 'glyphicon glyphicon-ban-circle'},
              {name: 'Device', value: 'device', icon: 'glyphicon glyphicon-oil'},
              {name: 'Room', value: 'room', icon: 'glyphicon glyphicon-modal-window'},
              {name: 'Scene', value: 'scene', icon: 'icon-picture'},
              {name: 'Time', value: 'time', icon: 'icon-clockalt-timealt'},
              {name: 'Time Offset', value: 'timeoffset', icon: 'icon-timer'},
              {name: 'Date', value: 'date', icon: 'icon-calendar'},
              {name: 'String', value: 'string', icon: 'icon-quote'},
              {name: 'Number', value: 'number', icon: 'icon-infinityalt'}
            ];

            $scope.devices = devices;
            $scope.rooms = rooms;
            $scope.scenes = scenes;

            $scope.changeType = function (type) {
              $scope.matcher.match_type = type;
              $scope.matcher.match = '';
            };

            $scope.changeDevice = function (device) {
              $scope.matcher.match = device.name;
            };

            $scope.changeDevice = function (device) {
              $scope.matcher.match = device.name;
            };

            $scope.changeRoom = function (room) {
              $scope.matcher.match = room.name;
            };

            $scope.changeScene = function (scene) {
              $scope.matcher.match = scene.name;
            };

            $scope.save = function () {
              $uibModalInstance.close($scope.matcher);
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss();
            };
          },
          resolve: {
            'matcher': function () {
              return angular.copy(matcher);
            },
            'types': function (triggers) {

              return triggers.types();

            },
            'devices': function ($q, Devices) {
              var defer = $q.defer();

              Devices.query().$promise.then(function (devices) {
                defer.resolve(devices);
              }, function (err) {
                defer.reject(err);
              });

              return defer.promise;
            },
            'rooms': function ($q, Rooms) {
              var defer = $q.defer();

              Rooms.query().$promise.then(function (rooms) {
                defer.resolve(rooms);
              }, function (err) {
                defer.reject(err);
              });

              return defer.promise;
            },
            'scenes': function ($q, Scenes) {
              var defer = $q.defer();

              Scenes.query().$promise.then(function (scenes) {
                defer.resolve(scenes);
              }, function (err) {
                defer.reject(err);
              });

              return defer.promise;
            }
          }
        });

        return modal;
      };

      $scope.addTriggerMatcher = function () {

        var modal = openMatcher({});

        modal.result.then(function (matcher) {
          $scope.ngModel = $scope.ngModel || [];
          $scope.ngModel.push(matcher);
        });
      };

      $scope.editTriggerMatcher = function (matcher) {

        var index = $scope.ngModel.indexOf(matcher),
          modal = openMatcher(matcher);

        modal.result.then(function (matcher) {
          $scope.ngModel.splice(index, 1, matcher);
        });
      };

      $scope.deleteTriggerMatcher = function (index) {
        confirm('Are you sure?').then(function () {
          $scope.ngModel.splice(index, 1);
        });
      };

    },
    templateUrl: 'modules/triggers/views/triggers.matchers.html',
    replace: true,
    link: function(scope, elm, attrs, ngModel) {
        //scope.$watch('ngModel', function (value) {
        //  if (attrs.required !== undefined && (value === undefined || value.length === 0)) {
        //    ngModel.$setValidity('matchersExist', false);
        //  } else {
        //    ngModel.$setValidity('matchersExist', true);
        //  }
        //});

    }
  };
});
