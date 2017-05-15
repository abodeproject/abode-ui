
var home = angular.module('abode.home');

home.directive('content', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      format: '@',
      top: '@',
      bottom: '@',
      left: '@',
      right: '@',
      height: '@',
      width: '@',
      align: '@',
      valign: '@',
      size: '@',
      background: '@',
      color: '@',
      shadow: '@',
      margin: '@',
      overflow: '@'
    },
    controller: function ($scope) {
      $scope.outerStyles = {};
      $scope.innerStyles = {};

      if ($scope.top) { $scope.outerStyles.top = ($scope.top.indexOf('%') === -1) ? $scope.top + 'em' : $scope.top; }
      if ($scope.bottom) { $scope.outerStyles.bottom = ($scope.bottom.indexOf('%') === -1) ? $scope.bottom + 'em' : $scope.bottom; }
      if ($scope.left) { $scope.outerStyles.left = ($scope.left.indexOf('%') === -1) ? $scope.left + 'em' : $scope.left; }
      if ($scope.right) { $scope.outerStyles.right = ($scope.right.indexOf('%') === -1) ? $scope.right + 'em' : $scope.right; }
      if ($scope.height) { $scope.outerStyles.height = ($scope.height.indexOf('%') === -1) ? $scope.height + 'em' : $scope.height; }
      if ($scope.width) { $scope.outerStyles.width = ($scope.width.indexOf('%') === -1) ? $scope.width + 'em' : $scope.width; }
      if ($scope.align) { $scope.innerStyles['text-align'] = $scope.align; }
      if ($scope.valign) { $scope.innerStyles['vertical-align'] = $scope.valign; }
      if ($scope.size) { $scope.innerStyles['font-size'] = $scope.size + 'em'; }
      if ($scope.background) { $scope.outerStyles.background = $scope.background; }
      if ($scope.color) { $scope.innerStyles.color = $scope.color; }
      if ($scope.shadow) { $scope.innerStyles['text-shadow'] = $scope.shadow; }
      if ($scope.margin) { $scope.innerStyles.margin = (isNaN($scope.margin)) ? $scope.margin : $scope.margin + 'em'; }
      if ($scope.overflow) { $scope.outerStyles.overflow = $scope.overflow || 'hidden'; }

    },
    template: '<div class="content" ng-style="outerStyles"><div style="display:table; height: 100%; width: 100%"><div style="display:table-cell;" ng-style="innerStyles" ng-transclude></div></div></div>',
    replace: true,
  };
});
