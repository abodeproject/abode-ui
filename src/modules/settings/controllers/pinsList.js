
var settings = angular.module('abode.settings');

settings.controller('pinsList', ['$scope', 'Pins', function ($scope, Pins) {
  $scope.loading = true;
  $scope.pins = [];

  Pins.query().$promise.then(function (results) {
    $scope.loading = false;
    $scope.pins = results;
  });

}]);
