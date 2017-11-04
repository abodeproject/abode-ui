var settings = angular.module('abode.settings');

settings.controller('historyCtl', function ($scope, $http, abode) {
  
  $http.get(abode.url('/api/history').value()).then(function (response) {
    $scope.stats = response.data;
  });
});