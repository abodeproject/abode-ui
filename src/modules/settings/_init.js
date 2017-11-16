var settings = angular.module('abode.settings', ['ui.router']);

settings.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/settings', '/settings/list');
  $urlRouterProvider.when('/settings/sources', '/settings/sources/list');
  $urlRouterProvider.when('/settings/interfaces', '/settings/interfaces/list');
  $urlRouterProvider.when('/settings/pins', '/settings/pins/list');
  $urlRouterProvider.when('/settings/users', '/settings/users/list');

  $stateProvider
  .state('main.settings', {
    url: '/settings',
    templateUrl: 'modules/settings/views/settings.html',
    controller: 'settings',
    resolve: {
      config: function (settings) {
        return settings.get_config();
      }
    }
  })
  .state('main.settings.list', {
    url: '/list',
    templateUrl: 'modules/settings/views/settings.list.html',
    controller: function ($scope) {
      $scope.settings = [
        {'name': 'General', 'route': 'main.settings.general'},
        {'name': 'Client', 'route': 'main.settings.client'},
        {'name': 'Interfaces', 'route': 'main.settings.interfaces'},
        {'name': 'Pins', 'route': 'main.settings.pins'},
        {'name': 'Users', 'route': 'main.settings.users'},
        //{'name': 'Sources', 'route': 'main.settings.sources'},
        //{'name': 'Sensors', 'route': 'main.settings.sensors'},
        {'name': 'Providers', 'route': 'main.settings.providers'},
        //{'name': 'Display', 'route': 'main.settings.display'},
        //{'name': 'Networking', 'route': 'main.settings.networking'},,
        {'name': 'History', 'route': 'main.settings.history'},
        {'name': 'Advanced', 'route': 'main.settings.advanced'}
      ];
    }
  })
  .state('main.settings.general', {
    url: '/general',
    templateUrl: 'modules/settings/views/settings.general.html',
    controller: 'settings',
    resolve: {
      config: function (settings) {
        return settings.get_config();
      }
    }
  })
  .state('main.settings.client', {
    url: '/client',
    templateUrl: 'modules/settings/views/settings.client.html',
    controller: 'clientEdit',
    resolve: {
      interfaces: ['Interfaces', function (Interfaces) {

        return Interfaces.query().$promise;
      }],
      device: ['abode', 'AuthDevice', function (abode, AuthDevice) {
        return AuthDevice.get().$promise;
      }]
    }
  })
  .state('main.settings.history', {
    url: '/history',
    templateUrl: 'modules/settings/views/settings.history.html',
    controller: 'historyCtl',
  })
  .state('main.settings.users', {
    url: '/users',
    templateUrl: 'modules/settings/views/settings.users.html',
  })
  .state('main.settings.users.list', {
    url: '/list',
    templateUrl: 'modules/settings/views/settings.users.list.html',
    controller: 'usersList',
  })
  .state('main.settings.users.add', {
    url: '/add',
    templateUrl: 'modules/settings/views/settings.users.add.html',
    controller: 'usersAdd',
  })
  .state('main.settings.users.edit', {
    url: '/:id',
    templateUrl: 'modules/settings/views/settings.users.edit.html',
    controller: 'usersEdit',
    resolve: {
      'user': ['$q', '$stateParams', 'Users', function ($q, $stateParams, Users) {
        var defer = $q.defer();

        Users.get($stateParams).then(function (record) {
          defer.resolve(record);
        }, function () {
          defer.reject({'state': 'main.settings.users', 'message': 'User not found'});
        });

        return defer.promise;
      }]
    }
  })

  .state('main.settings.pins', {
    url: '/pins',
    templateUrl: 'modules/settings/views/settings.pins.html',
  })
  .state('main.settings.pins.list', {
    url: '/list',
    templateUrl: 'modules/settings/views/settings.pins.list.html',
    controller: 'pinsList',
  })
  .state('main.settings.pins.add', {
    url: '/add',
    templateUrl: 'modules/settings/views/settings.pins.add.html',
    controller: 'pinsAdd',
  })
  .state('main.settings.pins.edit', {
    url: '/:id',
    templateUrl: 'modules/settings/views/settings.pins.edit.html',
    controller: 'pinsEdit',
    resolve: {
      'pin': ['$q', '$stateParams', 'Pins', function ($q, $stateParams, Pins) {
        var defer = $q.defer();

        Pins.get($stateParams).$promise.then(function (record) {
          defer.resolve(record);
        }, function () {
          defer.reject({'state': 'main.settings.pins', 'message': 'Pin not found'});
        });

        return defer.promise;
      }]
    }
  })
  .state('main.settings.interfaces', {
    url: '/interfaces',
    templateUrl: 'modules/settings/views/settings.interfaces.html',
  })
  .state('main.settings.interfaces.list', {
    url: '/list',
    templateUrl: 'modules/settings/views/settings.interfaces.list.html',
    controller: 'interfacesList',
  })
  .state('main.settings.interfaces.add', {
    url: '/add',
    templateUrl: 'modules/settings/views/settings.interfaces.add.html',
    controller: 'interfacesAdd',
  })
  .state('main.settings.interfaces.edit', {
    url: '/:id',
    templateUrl: 'modules/settings/views/settings.interfaces.edit.html',
    controller: 'interfacesEdit',
    resolve: {
      iface: ['$q', '$stateParams', 'Interfaces', function ($q, $stateParams, Interfaces) {
        var defer = $q.defer();

        Interfaces.get($stateParams).$promise.then(function (record) {
          defer.resolve(record);
        }, function () {
          defer.reject({'state': 'main.settings.interfaces', 'message': 'Interface not found'});
        });

        return defer.promise;
      }]
    }
  })
  .state('main.settings.sources', {
    url: '/sources',
    templateUrl: 'modules/settings/views/settings.sources.html',
  })
  .state('main.settings.sources.list', {
    url: '/list',
    templateUrl: 'modules/settings/views/settings.sources.list.html',
    controller: 'sourceSettings',
    resolve: {
      sources: function (settings) {
        return settings.get_sources();
      }
    }
  })
  .state('main.settings.sources.add', {
    url: '/add',
    templateUrl: 'modules/settings/views/settings.sources.add.html',
    controller: 'addSourceSettings',
    resolve: {
      sources: function (settings) {
        return settings.get_sources();
      }
    }
  })
  .state('main.settings.sources.edit', {
    url: '/:name',
    templateUrl: 'modules/settings/views/settings.sources.edit.html',
    controller: 'editSourceSettings',
    resolve: {
      'source': function ($stateParams, $state, settings) {

        return settings.get_source($stateParams.name);

      }
    }
  })
  .state('main.settings.sensors', {
    url: '/sensors',
    templateUrl: 'modules/settings/views/settings.sensors.html',
  })
  .state('main.settings.providers', {
    url: '/providers',
    controller: 'providersCtl',
    templateUrl: 'modules/settings/views/settings.providers.html',
  })
  .state('main.settings.display', {
    url: '/display',
    templateUrl: 'modules/settings/views/settings.display.html',
  })
  .state('main.settings.networking', {
    url: '/networking',
    templateUrl: 'modules/settings/views/settings.networking.html',
  })
  .state('main.settings.advanced', {
    url: '/advanced',
    templateUrl: 'modules/settings/views/settings.advanced.html',
  });
});


















