
var welcome = angular.module('abode.welcome');

welcome.controller('welcomeInterfacesController', ['$scope', '$timeout', '$http', '$q', '$state', 'abode', 'Interfaces', 'AuthDevice', function ($scope, $timeout, $http, $q, $state, abode, Interfaces, AuthDevice) {

  abode.load();
  $scope.config = abode.config;
  $scope.loading = false;
  $scope.failed = false;
  $scope.interfaces = [];
  $scope.state = $state;
  $scope.checking_device = true;
  $scope.interface = new Interfaces({'icon': 'icon-monitor', 'template': '<div></div>'});

  $scope.default_interfaces = [
    'Controller',
    'Clock',
    'Security',
  ];

  AuthDevice.get().$promise.then(function (record) {
    $scope.device = record;

    if (record.config && record.config.interface) {
      $scope.done(record.config.interface);
    } else {
      $scope.checking_device = false;
      $timeout($scope.load_interfaces, 100);
    }
  }, function (err) {
    $scope.checking_device = false;
    abode.message({'type': 'failed', 'message': err});
      console.error(err);
    $state.go('welcome_devices');
  });

  $scope.reset_server = function () {
    abode.save({});
    $state.go('welcome');
  };

  $scope.load_interfaces = function () {
    $scope.loading = true;
    $scope.interfaces = [];

    Interfaces.query(function (results) {
      $scope.interfaces = results;
      $scope.loading = false;
    }).$promise.then(undefined, function () {
      $scope.loading = false;
      abode.message({'type': 'failed', 'message': 'Failed to load interfaces'});
    });

  };

  $scope.done = function (interface) {
    $scope.config.interface = interface;

    abode.save($scope.config);

    $state.go('main.home', {'interface': interface});
  };

  $scope.select = function (interface) {

    $scope.device.$set_interface(interface).then(function () {
      $scope.done(interface);
    }, function (err) {
      abode.message({'type': 'failed', 'message': err.message || err});
    });

  };

  $scope.create = function () {
    $scope.interface.$save().then(function (data) {
      $scope.select(data.name);
    }, function () {
      console.dir(arguments);
    });
  };


}]);
