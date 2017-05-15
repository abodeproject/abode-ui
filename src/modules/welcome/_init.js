var welcome = angular.module('abode.welcome', []);

welcome.config(['$stateProvider', '$urlRouterProvider', function($state, $urlRouter) {

  $state
    .state('welcome', {
      url: '/Welcome',
      templateUrl: "modules/welcome/views/index.html",
      controller: 'welcomeController',
      resolve: {
        'connection': ['$q', '$http', function ($q, $http) {
          var defer = $q.defer();

          $http.get('/api/network').then(function (network) {
            defer.resolve(network.data);
          }, function () {
            defer.resolve(false);
          });

          return defer.promise;
        }]
      }
    })
    .state('welcome_configure', {
      url: '/Welcome/Configure',
      templateUrl: "modules/welcome/views/configure.html",
      controller: 'welcomeConfigureController',
    })
    .state('welcome_login', {
      url: '/Welcome/Login',
      templateUrl: "modules/welcome/views/login.html",
      controller: 'welcomeLoginController',
    })
    .state('welcome_devices', {
      url: '/Welcome/Devices',
      templateUrl: "modules/welcome/views/devices.html",
      controller: 'welcomeDevicesController',
      resolve: {
        'rad': ['$q', '$http', '$location', function ($q, $http, $location) {
          var defer = $q.defer();
          var opts = {
            'headers': {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache',
              'Expires': 0
            }
          };

          if ($location.host().indexOf('localhost') !== 0) {
            defer.resolve();
            return defer.promise;
          }

          $http.get('/api/abode/status', opts).then(function (response) {
              defer.resolve(response.data);
          }, function () {
            defer.resolve();
          });

          return defer.promise;
        }]
      }
    })
    .state('welcome_interfaces', {
      url: '/Welcome/Interface',
      templateUrl: "modules/welcome/views/interfaces.html",
      controller: 'welcomeInterfacesController',
    });

}]);
