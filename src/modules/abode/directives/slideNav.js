
var abode = angular.module('abode');

abode.directive('slideNav', ['slideNavSvc', '$timeout', function (slideNavSvc, $timeout) {
  return {
    'resitrct': 'E',
    'replace': true,
    'transclude': true,
    'scope': {
      minTime: '=?',
      minOpen: '=?',
      minLeft: '=?'
    },
    'template': '<div><div class="slide-nav" ng-transclude></div><div class="slide-nav-shade" ng-click="close()"></div></div>',
    'link': function ($scope, elem) {
      var nav_elem = elem[0].childNodes[0];
      var shade_elem = elem[0].childNodes[1];

      $scope.minTime = $scope.minTime || 500;
      $scope.minOpen = $scope.minOpen || 40;
      $scope.minLeft = $scope.minLeft || 20;

      nav_elem.style.left = '-1000px';
      nav_elem.style.display = 'block';

      slideNavSvc.init($scope, elem);

      $scope.$on('set_state', function (e, state) {
        $timeout(function () {

          //$scope.nav_styles.left = state.nav.left;
          nav_elem.style.left = state.nav.left;
          nav_elem.style.transition = state.nav.left;
          shade_elem.style.display = state.shade.display;
          shade_elem.style.backgroundColor = state.shade['background-color'];
          $scope.is_open = state.is_open;
        });
      });

      $scope.open = slideNavSvc.open;
      $scope.close = slideNavSvc.close;
    },
  }
}]);
