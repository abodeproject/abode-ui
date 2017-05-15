var devices = angular.module('abode.devices', ['ui.router','ngResource']);

devices.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/devices', '/devices/list');

  $stateProvider
  .state('main.devices', {
    url: '/devices',
    templateUrl: 'modules/devices/views/devices.html',
  })
  .state('main.devices.list', {
    url: '/list',
    templateUrl: 'modules/devices/views/devices.list.html',
    controller: 'devicesList'
  })
  .state('main.devices.add', {
    url: '/add',
    templateUrl: 'modules/devices/views/devices.add.html',
    controller: 'devicesAdd',
    resolve: {
      'providers': function ($q, $http, abode) {
        var defer = $q.defer();

        $http.get(abode.url('/api/abode/providers').value()).then(function (response) {
          defer.resolve(response.data);
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      },
      'capabilities': function ($q, $http, abode) {
        var defer = $q.defer();

        $http.get(abode.url('/api/abode/capabilities').value()).then(function (response) {
          defer.resolve(response.data);
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      }
    }
  })
  .state('main.devices.edit', {
    url: '/:name',
    templateUrl: 'modules/devices/views/devices.edit.html',
    controller: 'devicesEdit',
    resolve: {
      'device': function ($stateParams, $state, abode, Devices) {

        return Devices.get({'id': $stateParams.name}).$promise;

      },
      'providers': function ($q, $http, abode) {
        var defer = $q.defer();

        $http.get(abode.url('/api/abode/providers').value()).then(function (response) {
          defer.resolve(response.data);
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      },
      'capabilities': function ($q, $http, abode) {
        var defer = $q.defer();

        $http.get(abode.url('/api/abode/capabilities').value()).then(function (response) {
          defer.resolve(response.data);
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      }
    }
  });
});














