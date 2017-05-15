
var scenes = angular.module('abode.scenes');

scenes.controller('scenesAdd', function ($scope, $state, abode, Scenes) {
  $scope.scene = new Scenes();
  $scope.alerts = [];

  $scope.back = function () {
    $state.go('index.scenes');
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.add = function () {
    $scope.scene.$save().then(function () {
      abode.message({'type': 'success', 'message': 'Scene Added'});
      $state.go('^.list');
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to add Scene', 'details': err});
      $scope.errors = err;
    });
  };
});
