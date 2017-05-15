
var home = angular.module('abode.home');

home.directive('interface', ['$sce', 'abode', function ($sce, abode) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      'view': '@',
      'time': '=',
      'client': '='
    },
    controller: ['$scope', function ($scope) {
    }],
    templateUrl: function () {
      //return $sce.trustAsResourceUrl(abode.url('/api/abode/views/home.html').value());
      return $sce.trustAsResourceUrl(abode.url('/api/interfaces/' + abode.config.interface + '/template').value());
    },
  };
}]);
