
var settings = angular.module('abode.settings');

settings.controller('editSourceSettings', function ($scope, $state, abode, settings, source, confirm) {
  $scope.source = source;
  var notifier = abode.message;

  $scope.save = function () {
    settings.save_source($scope.source).then(function () {
      abode.message({'type': 'success', 'message': 'Source Saved'});
    }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to save Source', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Source?').then(function () {
      settings.remove_source($scope.source).then(function () {
        abode.message({'type': 'success', 'message': 'Source Removed'});
        $state.go('main.settings.sources.list');
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to remove Source', 'details': err});
        $scope.errors = err;
      });
    });
  };

});
