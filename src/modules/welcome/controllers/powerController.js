
var welcome = angular.module('abode.welcome');

welcome.controller('powerController', ['$scope', '$http', 'abode', function ($scope, $http, abode) {
  $scope.working = false;

  $scope.restart = function () {
    $scope.working = true;
    $http.post('/api/abode/restart').then(function () {

    }, function () {
      $scope.working = false;
      abode.message({'type': 'failed', 'message': 'Error restarting'});
    });
  };

  $scope.shutdown = function () {
    $scope.working = true;
    $http.post('/api/abode/shutdown').then(function () {

    }, function () {
      $scope.working = false;
      abode.message({'type': 'failed', 'message': 'Error restarting'});
    });
  };
}]);
