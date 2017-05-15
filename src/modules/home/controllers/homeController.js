var home = angular.module('abode.home');

home.controller('homeController', ['$scope', '$state', '$templateCache', 'abode', 'Interfaces', 'time', function ($scope, $state, $templateCache, abode, Interfaces, time) {
  $scope.interface = $state.params.interface || abode.config.interface;
  $scope.client = abode.config.auth.device.config;
  $scope.time = time;

  abode.config.interface = $scope.interface;

  //If we get an EVENTS_RESET event, schedule a refresh
  var time_events = abode.scope.$on('TIME_CHANGE', function (event, msg) {
    angular.merge($scope.time, msg.object);
  });

  abode.get_events();

  $scope.$on('$destroy', function () {
    time_events();
  });

}]);
