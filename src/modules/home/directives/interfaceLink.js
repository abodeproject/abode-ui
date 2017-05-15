
var home = angular.module('abode.home');

home.directive('interfaceLink', function () {  return {
    restrict: 'E',
    replace: true,
    scope: {
      'interface': '='
    },
    templateUrl: 'modules/home/views/interfaceLink.html',
  };
});
