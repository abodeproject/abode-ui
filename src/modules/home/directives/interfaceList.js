
var home = angular.module('abode.home');

home.directive('interfaceList', function () {  return {
    restrict: 'E',
    replace: true,
    scope: {
      'show': '@'
    },
    templateUrl: 'modules/home/views/interfaceList.html',
    controller: ['$scope', 'Interfaces', function ($scope, Interfaces) {
      $scope.interfaces = [];

      Interfaces.query().$promise.then(function (results) {
        if (!$scope.show) {
          $scope.interfaces = results;
        } else {
          ifaces = $scope.show.split(',');
          ifaces.forEach(function (show) {
            match = results.filter(function (iface) { return show === iface.name; });
            if (match.length !== 0) {
              $scope.interfaces.push(match[0]);
            }
          });
        }

      });


    }]
  };
});
