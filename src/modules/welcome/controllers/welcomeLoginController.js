
var welcome = angular.module('abode.welcome');

welcome.controller('welcomeLoginController', ['$scope', '$timeout', '$http', '$q', '$state', 'abode', 'Auth', function ($scope, $timeout, $http, $q, $state, abode, Auth) {

  abode.load();
  $scope.config = abode.config;
  $scope.loading = false;
  $scope.failed = false;
  $scope.login = {};
  $scope.state = $state;
  $scope.auth = new Auth();
  $scope.checking_login = true;

  $scope.reset_server = function () {
    abode.save({});
    $state.go('welcome');
  };

  $scope.do_login = function (supress) {
    loading = true;
    $scope.auth.$login().then(function (response) {
      loading = false;
      $scope.checking_login = false;

      if (response.token) {
        $scope.config.auth = $scope.auth;
        abode.save($scope.config);
        $state.go('welcome_devices');
      } else {
        $scope.checking_login = false;
        if (!supress) {
          abode.message({'message': 'Failed to Get Token', 'type': 'failed'});
        }
      }

    }, function (error) {
      loading = false;
      $scope.checking_login = false;

      var msg = (error.data && error.data.message) ? error.data.message : error.data;
      if (!supress) {
        abode.message({'message': msg || 'Unknown error occured', 'type': 'failed'});
      }
    });
  };

  $scope.do_login(true);

}]);
