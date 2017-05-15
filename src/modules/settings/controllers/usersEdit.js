
var settings = angular.module('abode.settings');

settings.controller('usersEdit', ['$scope', '$state', 'abode', 'confirm', 'user', function ($scope, $state, abode, confirm, user) {
  $scope.user = user;
  $scope.tokens = [];
  $scope.auth = abode.config.auth;

  $scope.loading = false;
  $scope.working = false;

  $scope.load = function () {
    $scope.loading = true;

    $scope.user.$tokens().then(function (tokens) {
      $scope.loading = false;
      $scope.tokens = tokens;
    }, function () {
      $scope.loading = false;
    });
  };

  $scope.save = function () {
    $scope.working = true;
    if ($scope.user.password === '') {
      $scope.user.password = undefined;
    }
    $scope.user.$update().then(function () {
      $scope.working = false;
      $scope.user.password = undefined;
      $scope.user.newpassword2 = undefined;

      abode.message({'type': 'success', 'message': 'User saved successfully'});
    }, function (err) {
      $scope.working = false;
      $scope.field_errors = err.data.fields;

      abode.message({'type': 'failed', 'message': err.data.message || err.data || 'Failed to save User'});
    });
  };

  $scope.delete = function () {
    $scope.working = true;

    confirm('Are you sure?', {'title': 'Delete User', 'icon': 'icon-trash'}).then(function () {
      $scope.user.$delete().then(function () {
        $scope.working = false;
        abode.message({'type': 'success', 'message': 'User Deleted'});
        $state.go('^');
      }, function (err) {
        abode.message({'type': 'failed', 'message': err.data.message || 'Failed to delete User', 'details': err});
        $scope.errors = err;
        $scope.working = false;
      });
    });

  };

  $scope.delete_token = function (token) {

    confirm('Are you sure?', {'title': 'Delete Token', 'icon': 'icon-trash'}).then(function () {
      token.$delete().then(function () {
        $scope.working = false;
        abode.message({'type': 'success', 'message': 'Token Deleted'});

        $scope.load();
      }, function (err) {
        abode.message({'type': 'failed', 'message': 'Failed to delete Token', 'details': err});
        $scope.errors = err;
        $scope.working = false;
      });
    });
  };


  $scope.load();

}]);
