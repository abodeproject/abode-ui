
var settings = angular.module('abode.settings');

settings.controller('usersAdd', ['$scope', '$state', 'abode', 'Users', function ($scope, $state, abode, Users) {
  $scope.user = Users.create();
  $scope.field_errors = {};
  $scope.working = false;

  $scope.add = function () {
    $scope.working = true;
    $scope.user.$save().then(function () {
      $scope.user = new Users.create();
      $scope.working = true;
      abode.message({'type': 'success', 'message': 'User added successfully'});
      $state.go('^');
    }, function (err) {
      $scope.working = false;
      $scope.field_errors = err.data.fields;
      console.log(err);
      abode.message({'type': 'failed', 'message': err.data.message || err.data || 'Failed to add User'});
    });
  };

}]);
