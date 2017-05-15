
var triggers = angular.module('abode.triggers');

triggers.directive('conditions', function ($uibModal) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'value': '=',
      'type': '@',
      'name': '='
    },
    controller: function ($scope, triggers) {
      $scope.name = $scope;
      $scope.conditions = $scope.value;

      $scope.addCondition = triggers.addCondition;
      $scope.editCondition = triggers.editCondition;

      $scope.removeCondition = function (index) {
        $scope.value.splice(index, 1);
      };
    },
    templateUrl: 'modules/triggers/views/triggers.conditions.html',
    replace: true,
  };
});
