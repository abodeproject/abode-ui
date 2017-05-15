
var abode = angular.module('abode');

abode.directive('toggle', function () {
  return {
    restrict: 'E',
    transclude: false,
    scope: {
      on: '@',
      off: '@',
      value: '=',
    },
    controller: function ($scope) {
      $scope.styles = {};
      $scope.value = ($scope.value === true) ? true : false;

      if (!$scope.on) { $scope.on = 'On'; }
      if (!$scope.off) { $scope.on = 'Off'; }

      var setStyles = function () {
        if ($scope.value) {
          $scope.styles.left = '1em';
        } else {
          $scope.styles.left = '0em';
        }
      };

      setStyles();

      $scope.styles = {
        'top': '0em',
        'bottom': '0em',
        'width': '1em',
        'background-color': '#eee',
        'box-sizing': 'border-box',
        'position': 'absolute',
        'transition': '.2s',
        'border-radius': '.1em',
      };

      $scope.toggle = function () {
        if ($scope.value) {
          $scope.value = false;
        } else {
          $scope.value = true;
        }
      };

      $scope.$watch('value', function () {
        setStyles();
      }, true);

    },
    template: '<div ng-click="toggle()" ng-class="{\'bg-success\': (value == true)}" style="border-radius: .1em; cursor: pointer; transition: .2s; position: relative; box-sizing: border-box; width: 2em; height: 1em; line-height: 1em; display:inline-block; border: 1px solid #aaa;"><div ng-style="styles"></div></div>',
    replace: true,
  };
});
