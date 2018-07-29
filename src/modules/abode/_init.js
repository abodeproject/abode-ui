var abode = angular.module('abode', [
  'ng',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'rzModule',
  'abode.welcome',
  'abode.home',
  'abode.devices',
  'abode.rooms',
  'abode.scenes',
  'abode.triggers',
  'abode.settings',
  'abode.weather',
  'abode.alarmclock',
  'abode.notifications',
  'abode.chart',
  'insteon',
  'insteonhub',
  'camera',
  'wunderground',
  'ifttt',
  'rad',
  'lutroncaseta',
  'radiothermostat',
  'mqtt',
  'zwave',
  'video',
  'autoshades',
  'synology',
  'isy'
]);

abode.config(['$stateProvider', '$urlRouterProvider', 'abodeProvider', 'uiGmapGoogleMapApiProvider', function($state, $urlRouter, abode, uiGmapGoogleMapApiProvider) {

  abode.load();

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBiso0Yt_wOnMecNuyFCiucXsZ0LAManuM',
  });

  if (abode.config && abode.config.auth && abode.config.auth.device && abode.config.auth.device.config && abode.config.auth.device.config.interface) {
    $urlRouter.otherwise('/Home/' + abode.config.auth.device.config.interface);
    $urlRouter.when('', '/Home/' + abode.config.auth.device.config.interface);
  } else {
    $urlRouter.otherwise('/Welcome');
    $urlRouter.when('', '/Welcome');
  }

  $state
    .state('main', {
      url: '',
      templateUrl: "modules/abode/views/index.html",
      controller: 'mainController',
      resolve: {
        auth: ['$q', '$uibModal', 'abode', 'Auth', function ($q, $uibModal, abode, Auth) {
          var defer = $q.defer();

          if (!abode.config.server) {
            defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            return defer.promise;
          }

          Auth.check().$promise.then(function (auth) {
            abode.config.auth = auth;
            abode.save(abode.config);
            abode.load();
            defer.resolve(auth);
          },
          function (response) {
            delete abode.config.auth;
            abode.save();

            if (response.status === 403) {
              defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            } else if (response.status === 401) {
              defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            } else {
              defer.reject({'message': 'Server has gone away', 'action': 'serverGone'});

            }

          });

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
