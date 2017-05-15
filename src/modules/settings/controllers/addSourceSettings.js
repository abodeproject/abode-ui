
var settings = angular.module('abode.settings');

settings.controller('addSourceSettings', function ($scope, $state, abode, settings) {
  $scope.source = {};
  var notifier = abode.message;


  $scope.add = function () {
    settings.add_source($scope.source).then(function () {
      abode.message({'type': 'success', 'message': 'Source Added'});
      $scope.source = {};
    }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to add Source', 'details': err});
      $scope.errors = err;
    });
  };

});
