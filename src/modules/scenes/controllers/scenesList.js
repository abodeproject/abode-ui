
var scenes = angular.module('abode.scenes');

scenes.controller('scenesList', function ($scope, $state, scenes) {
  $scope.scenes = [];
  $scope.loading = true;

  $scope.view = function (scene) {
    scenes.view(scene.name);
  };

  $scope.edit = function (scene) {
    $state.go('main.scenes.edit', {'name': scene.name});
  };

  $scope.load = function () {
    scenes.load().then(function (scenes) {
      $scope.scenes = scenes;
      $scope.loading = false;
      $scope.error = false;
    }, function () {
      $scope.loading = false;
      $scope.error = true;
    });
  };



  $scope.load();
});
