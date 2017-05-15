
var settings = angular.module('abode.settings');

settings.controller('usersList', ['$scope', 'Users', function ($scope, Users) {

  $scope.loading = true;
  $scope.users = [];

  Users.query().then(function (results) {
    $scope.loading = false;
    $scope.users = results;
  });

}]);
