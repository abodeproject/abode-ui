
var abode = angular.module('abode');

abode.directive('datetime', function () {

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
      size: '@',
      background: '@',
      color: '@',
      shadow: '@',
      margin: '@'
    },
    controller: function ($scope, $filter, $interval, datetime) {
      $scope.styles = {position: 'absolute'};
      $scope.now = datetime.get();
      $scope.format = $scope.format || 'short';
      $scope.interval = $scope.interval || 1;

      if ($scope.top) { $scope.styles.top = $scope.top + 'em'; }
      if ($scope.bottom) { $scope.styles.bottom = $scope.bottom + 'em'; }
      if ($scope.left) { $scope.styles.left = $scope.left + 'em'; }
      if ($scope.right) { $scope.styles.right = $scope.right + 'em'; }
      if ($scope.height) { $scope.styles.height = $scope.height + 'em'; }
      if ($scope.width) { $scope.styles.width = $scope.width + 'em'; }
      if ($scope.align) { $scope.styles['text-align'] = $scope.align; }
      if ($scope.size) { $scope.styles['font-size'] = $scope.size + 'em'; }
      if ($scope.background) { $scope.styles.background = $scope.background; }
      if ($scope.color) { $scope.styles.color = $scope.color; }
      if ($scope.shadow) { $scope.styles['text-shadow'] = $scope.shadow; }
      if ($scope.margin) { $scope.styles.margin = (isNaN($scope.margin)) ? $scope.margin : $scope.margin + 'em'; }

      $interval(function () {
        $scope.formatted = $filter('date')($scope.now.date, $scope.format);
      }, $scope.interval * 1000);

    },
    template: '<div class="datetime" ng-style="styles">{{formatted}}</div>',
    replace: true,
  };

});
