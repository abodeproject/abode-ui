var home = angular.module('abode.home', []);

home.config(['$stateProvider', '$urlRouterProvider', function($state, $urlRouter) {

  $state
    .state('main.home', {
      url: '/Home/:interface',
      template: '<interface class="interface" time="time" client="client"></interface>',
      controller: 'homeController',
      resolve: {
        'interface': ['$stateParams', '$q', 'auth', 'abode', function ($stateParams, $q, auth, abode) {
          var interface,
            defer = $q.defer();

          if (auth.device && auth.device.config && auth.device.config.interface) {
            interface = auth.device.config.interface;
          } else {
            defer.reject({'state': 'welcome_devices'});
            return defer.promise;
          }

          abode.config.interface = $stateParams.interface || abode.config.interface;

          defer.resolve();

          return defer.promise;
        }],
        'time': ['$q', '$http', 'abode', function ($q, $http, abode) {
          var defer = $q.defer();

          $http.get(abode.url('/api/time').value()).then(function (response) {
            defer.resolve(response.data);
          }, function () {
            defer.resolve({});
          });

          return defer.promise;
        }]
      }
    });

}]);
