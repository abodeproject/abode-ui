
var insteon = angular.module('insteon');

insteon.directive('insteonModemLinking', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'ngModel': '=',
      'showHeading': '=',
      'forceController': '=',
      'forceResponder': '=',
      'forceGroup': '=',
    },
    require: 'ngModel',
    controller: function ($scope, insteon) {

      $scope.isCollapsed = ($scope.showHeading);
      $scope.linking = {
        controller: true,
        group: 1
      };

      if ($scope.forceController) {
        $scope.linking.controller = true;
      }

      if ($scope.forceResponder) {
        $scope.linking.controller = false;
      }

      if ($scope.forceGroup) {
        $scope.linking.group = insteon.parseGroup($scope.forceGroup);
      }

      insteon.get_scenes().then(function (results) {
        $scope.scenes = results;
      }, function () {
      });

      $scope.start_linking = function (controller, group) {
        $scope.link_waiting = true;
        $scope.link_error = false;

        insteon.modem_start_all_linking(controller, group).then(function (device) {
          $scope.link_waiting = false;
          $scope.link_error = false;

          $scope.ngModel = device;
        }, function (err) {
          $scope.link_waiting = false;
          $scope.link_error = true;

          $timeout(function () {
            $scope.link_error = false;
          }, 2000);

          abode.message({
            'type': 'failed',
            'message': 'Failed to enter linking',
            'details': err
          });
        });
      };

      $scope.cancel_linking = function (controller, group) {

        insteon.modem_cancel_all_linking().then(function () {
          $scope.link_waiting = false;
          $scope.link_error = false;
        }, function (err) {
          $scope.link_waiting = false;
          $scope.link_error = true;

          $timeout(function () {
            $scope.link_error = false;
            $scope.link_waiting = true;
          }, 1000);

          abode.message({
            'type': 'failed',
            'message': 'Failed to cancel linking',
            'details': err
          });
        });
      };
    },
    templateUrl: 'modules/insteon/views/modem_linking.html',
    replace: true,
  };

});
