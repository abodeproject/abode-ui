
var settings = angular.module('abode.settings');

settings.controller('interfacesList', ['$scope', 'Interfaces', function ($scope, Interfaces) {
  $scope.interfaces = Interfaces.query();
}]);
