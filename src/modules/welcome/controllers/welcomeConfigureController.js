
var welcome = angular.module('abode.welcome');

welcome.controller('welcomeConfigureController', ['$scope', '$state', '$timeout', 'abode', 'settings', 'Auth', function ($scope, $state, $timeout, abode, settings, Auth) {
  'use strict';

  $scope.loading = true;
  $scope.error = false;
  $scope.saving = false;

  settings.get_config().then(function (config) {
    $scope.loading = false;
    $scope.error = false;

    $scope.config = config;
    $scope.config.mode = 'server';
    $scope.config.url = 'http://' + document.location.host;
  }, function (err) {
    $scope.loading = false;
    $scope.error = true;
  });

  $scope.setup = function () {
    $scope.saving = true;

    var fail = function (msg, err) {
      $scope.saving = false;
      $scope.error = true;

      $timeout(function () {
        $scope.error = false;
      }, 2000);

      abode.message({
        'type': 'failed',
        'message': msg,
        'details': err
      });
    };


    var finish = function () {
      abode.config = {
        server: $scope.config.url
      };

      $scope.auth = new Auth();
      $scope.auth.$check().then(function (status) {
        if (status.client_token && status.auth_token) {
          abode.config.auth = status;
          abode.save(abode.config);
          $state.go('welcome_devices');
        } else {
          abode.save($scope.config);
          $state.go('welcome_login');
        }

      }, function (error) {
        if (error.status === 401) {
          abode.save(abode.config);
          $state.go('welcome_login');
        } else if (error.status === 403) {
          abode.save(abode.config);
          $state.go('welcome_devices');
        } else {
          abode.message({'type': 'failed', 'message': 'Failed to connect'});
        }
      });
    };

    var reload_abode = function () {
      settings.reload().then(function () {

        finish();
      }, function (err) {
        fail('Failed to reload Abode', err);
      });
    };

    var save_config = function () {
      settings.save_config(undefined, $scope.config).then(function () {
        reload_abode();
      }, function (err) {
        fail('Failed to save settings', err);
      });
    };

    var check_db = function () {
      settings.check_db($scope.config.database).then(function () {
        save_config();
      }, function (err) {
        fail('Failed to check database settings', err);
      });
    };

    check_db();
  };
}]);
