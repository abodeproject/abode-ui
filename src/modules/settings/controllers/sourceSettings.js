
var settings = angular.module('abode.settings');

settings.controller('sourceSettings', function ($scope, $state, abode, settings, sources) {
  $scope.sources = sources;

  $scope.view = function (source) {
    $state.go('main.settings.sources.edit', {'name': source.name});
  };

});
