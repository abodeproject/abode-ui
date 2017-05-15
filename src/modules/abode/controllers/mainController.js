
var abode = angular.module('abode');

abode.controller('mainController', ['$scope', '$state', '$interval', 'abode', 'Security', 'Interfaces', 'auth', 'time', function ($scope, $state, $interval, abode, Security, Interfaces, auth, time) {

  $scope.date = new Date();
  $scope.root = abode.scope;
  $scope.client = abode.config.auth.device.config;
  $scope.device = abode.config.auth.device;
  $scope.interfaces = Interfaces.query();
  $scope.time = time;
  abode.get_events();

  if ($scope.device.locked) {
    Security.show_lock();
  }

  //If we get an EVENTS_RESET event, schedule a refresh
  var time_events = abode.scope.$on('TIME_CHANGE', function (event, msg) {
    angular.merge($scope.time, msg.object);
  });

  //If we get an CLIENT_UPDATED event, merge our client config
  var client_events = abode.scope.$on('CLIENT_UPDATED', function (event, msg) {
    if ($scope.device.locked !== msg.object.locked) {
      if (msg.object.locked) {
        Security.show_lock();
      } else {
        Security.hide_lock();
      }
    }
    angular.merge($scope.client, msg.object.config);
    angular.merge($scope.device, msg.object);

  });

  $interval(function () {
    $scope.date = new Date();
  },10 * 1000);

  $scope.logout = function () {
    auth.$logout().then(function () {
      abode.save({'server': abode.config.server});
      $state.go('welcome');
    }, function (err) {
      abode.message({'message': err.message || 'Unknown Error Occured', 'type': 'failed'});
      /*
      abode.config = {};
      abode.save({});
      $state.go('welcome');
      */
    });
  };
}]);
