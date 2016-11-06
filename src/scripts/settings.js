var settings = angular.module('abode.settings', ['ui.router']);

settings.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/settings', '/settings/list');
  $urlRouterProvider.when('/settings/sources', '/settings/sources/list');
  $urlRouterProvider.when('/settings/interfaces', '/settings/interfaces/list');

  $stateProvider
  .state('main.settings', {
    url: '/settings',
    templateUrl: '/views/settings/settings.html',
    controller: 'settings',
    resolve: {
      config: function (settings) {
        return settings.get_config();
      }
    }
  })
  .state('main.settings.list', {
    url: '/list',
    templateUrl: '/views/settings/settings.list.html',
    controller: function ($scope) {
      $scope.settings = [
        {'name': 'General', 'route': 'main.settings.general'},
        {'name': 'Client', 'route': 'main.settings.client'},
        {'name': 'Interfaces', 'route': 'main.settings.interfaces'},
        {'name': 'Sources', 'route': 'main.settings.sources'},
        {'name': 'Sensors', 'route': 'main.settings.sensors'},
        {'name': 'Providers', 'route': 'main.settings.providers'},
        {'name': 'Display', 'route': 'main.settings.display'},
        {'name': 'Networking', 'route': 'main.settings.networking'},
        {'name': 'Advanced', 'route': 'main.settings.advanced'}
      ];
    }
  })
  .state('main.settings.general', {
    url: '/general',
    templateUrl: '/views/settings/settings.general.html',
    controller: 'settings',
    resolve: {
      config: function (settings) {
        return settings.get_config();
      }
    }
  })
  .state('main.settings.client', {
    url: '/client',
    templateUrl: '/views/settings/settings.client.html',
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
  .state('main.settings.interfaces', {
    url: '/interfaces',
    templateUrl: '/views/settings/settings.interfaces.html',
  })
  .state('main.settings.interfaces.list', {
    url: '/list',
    templateUrl: '/views/settings/settings.interfaces.list.html',
    controller: 'interfacesList',
  })
  .state('main.settings.interfaces.add', {
    url: '/add',
    templateUrl: '/views/settings/settings.interfaces.add.html',
    controller: 'interfacesAdd',
  })
  .state('main.settings.interfaces.edit', {
    url: '/:id',
    templateUrl: '/views/settings/settings.interfaces.edit.html',
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
    templateUrl: '/views/settings/settings.sources.html',
  })
  .state('main.settings.sources.list', {
    url: '/list',
    templateUrl: '/views/settings/settings.sources.list.html',
    controller: 'sourceSettings',
    resolve: {
      sources: function (settings) {
        return settings.get_sources();
      }
    }
  })
  .state('main.settings.sources.add', {
    url: '/add',
    templateUrl: '/views/settings/settings.sources.add.html',
    controller: 'addSourceSettings',
    resolve: {
      sources: function (settings) {
        return settings.get_sources();
      }
    }
  })
  .state('main.settings.sources.edit', {
    url: '/:name',
    templateUrl: '/views/settings/settings.sources.edit.html',
    controller: 'editSourceSettings',
    resolve: {
      'source': function ($stateParams, $state, settings) {

        return settings.get_source($stateParams.name);

      }
    }
  })
  .state('main.settings.sensors', {
    url: '/sensors',
    templateUrl: '/views/settings/settings.sensors.html',
  })
  .state('main.settings.providers', {
    url: '/providers',
    templateUrl: '/views/settings/settings.providers.html',
  })
  .state('main.settings.display', {
    url: '/display',
    templateUrl: '/views/settings/settings.display.html',
  })
  .state('main.settings.networking', {
    url: '/networking',
    templateUrl: '/views/settings/settings.networking.html',
  })
  .state('main.settings.advanced', {
    url: '/advanced',
    templateUrl: '/views/settings/settings.advanced.html',
  });
});

settings.controller('clientEdit', function ($scope, abode, interfaces, device) {
  $scope.interfaces = interfaces;
  $scope.device = device;

  $scope.push_supported = ('serviceWorker' in navigator);

  $scope.subscribe = function () {
    Notification.requestPermission();

    navigator.serviceWorker.register('worker.js').then(function(reg) {
      $scope.serviceWorker_status = 'ok';

      if (!(reg.showNotification)) {
        $scope.pushNotifications_status = 'unsupported';
      } else {
        $scope.pushNotifications_status = 'supported';
      }

      /*
      navigator.serviceWorker.ready.then(function(reg) {
        //Update our worker
        reg.update();

        reg.pushManager.getSubscription()
        .then(function (subscription) {

          if (!subscription) {
            $scope.subscribed = false;
            $scope.subscription_status = 'unsubscribed';
            $scope.$apply();
            return;
          }

          $scope.push_endpoint = subscription.endpoint;
          $scope.push_key = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))));
          $scope.push_auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));

        })
        .catch(function(err) {
          console.log('Error during getSubscription()', err);
          $scope.subscription_status = 'error';
        });
      });
        */
    });

    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.subscribe({userVisibleOnly: true})
        .then(function(subscription) {

          $scope.device.config.push_notifications = true;
          $scope.device.config.push_endpoint = subscription.endpoint;
          $scope.device.config.push_key = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))));
          $scope.device.config.push_auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));

          $scope.save();
        })
        .catch(function(e) {
          abode.message({'type': 'failed', 'message': 'Failed to get push subscription: ' + e});
          console.log('Failed to get subscription:', e);
        });
    });

  };

  $scope.unsubscribe = function () {

    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.getSubscription().then(
        function(subscription) {
          var endpoint = subscription.endpoint;

          $scope.device.config.push_notifications = false;
          delete $scope.device.config.push_endpoint;
          delete $scope.device.config.push_key;
          delete $scope.device.config.push_auth;

          $scope.save();
        }).catch(function(e) {
          console.log('Error thrown while unsubscribing from ' +
            'push messaging.', e);
        });
    });
  };

  $scope.save = function () {
    $scope.device.$update().then(function (result) {
      abode.config.auth.device = result;
      abode.message({'type': 'success', 'message': 'Client Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': err.data });
    });
  };
});

settings.service('settings', function ($q, $http, $templateCache, abode) {

  var get_sources = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/sources').value).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_source = function (name) {
    var defer = $q.defer();

    $http.get('/api/sources/' + name).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_source = function (source) {
    var defer = $q.defer();

    $http.put('/api/sources/' + source._id, source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var add_source = function (source) {
    var defer = $q.defer();

    $http.post('/api/sources', source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var remove_source = function (source) {
    var defer = $q.defer();

    $http.delete('/api/sources/' + source._id).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var get_config = function (provider) {
    var defer = $q.defer();

    var url = (provider) ? '/api/abode/config/' + provider : '/api/abode/config';

    $http.get(abode.url(url).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_config = function (provider, config) {
    var defer = $q.defer();


    var url = (provider) ? '/api/abode/config/' + provider : '/api/abode/config';

    $http.put(url, config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var write_config = function () {
    var defer = $q.defer();

    $http.post('/api/abode/save').then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_view = function () {
    var defer = $q.defer();

    $http.get('/api/abode/views/home.html').then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_view = function (view) {
    var defer = $q.defer();

    $http.put('/api/abode/views/home.html', view, {headers: {'Content-Type': 'text/plain'}}).then(function (response) {
      $templateCache.put('/api/abode/views/home.html', view);
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  return {
    get_config: get_config,
    save_config: save_config,
    write_config: write_config,
    get_view: get_view,
    save_view: save_view,
    get_sources: get_sources,
    get_source: get_source,
    save_source: save_source,
    add_source: add_source,
    remove_source: remove_source,
  };

});

settings.controller('sourceSettings', function ($scope, $state, abode, settings, sources) {
  $scope.sources = sources;

  $scope.view = function (source) {
    $state.go('index.settings.sources.edit', {'name': source.name});
  };

});

settings.controller('addSourceSettings', function ($scope, $state, abode, settings) {
  $scope.source = {};
  var notifier = abode.message;


  $scope.add = function () {
    settings.add_source($scope.source).then(function () {
      notifier.notify({'status': 'success', 'message': 'Source Added'});
      $scope.source = {};
    }, function (err) {
        notifier.notify({'status': 'failed', 'message': 'Failed to add Source', 'details': err});
      $scope.errors = err;
    });
  };

})
.controller('editSourceSettings', function ($scope, $state, abode, settings, source, confirm) {
  $scope.source = source;
  var notifier = abode.message;

  $scope.save = function () {
    settings.save_source($scope.source).then(function () {
      notifier.notify({'status': 'success', 'message': 'Source Saved'});
    }, function (err) {
        notifier.notify({'status': 'failed', 'message': 'Failed to save Source', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    confirm('Are you sure you want to remove this Source?').then(function () {
      settings.remove_source($scope.source).then(function () {
        notifier.notify({'status': 'success', 'message': 'Source Removed'});
        $state.go('index.settings.sources.list');
      }, function (err) {
        notifier.notify({'status': 'failed', 'message': 'Failed to remove Source', 'details': err});
        $scope.errors = err;
      });
    });
  };

});

settings.controller('interfacesList', ['$scope', 'Interfaces', function ($scope, Interfaces) {
  $scope.interfaces = Interfaces.query();
}]);

settings.controller('interfacesAdd', ['$scope', '$state', 'abode', 'Interfaces', function ($scope, $state, abode, Interfaces) {
  $scope.iface = new Interfaces();

  $scope.save = function () {
    $scope.iface.$save().then(function (record) {
      abode.message({'type': 'success', 'message': 'Interface Created'});
      $state.go('^', record);

    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to Create Interface', 'details': err});
      $scope.errors = err;
    });
  };

}]);

settings.controller('interfacesEdit', ['$scope', '$state', '$templateCache', 'abode', 'iface', function ($scope, $state, $templateCache, abode, iface) {
  $scope.iface = iface;

  $scope.save = function () {
    $scope.iface.$update().then(function () {
      $templateCache.put(abode.url('/api/interfaces/' + $scope.iface.name + '/template').value(), $scope.iface.template);
      $templateCache.put(abode.url('/api/interfaces/' + $scope.iface._id + '/template').value(), $scope.iface.template);
      abode.message({'type': 'success', 'message': 'Interface Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Interface', 'details': err});
      $scope.errors = err;
    });
  };

  $scope.remove = function () {
    $scope.iface.$delete().then(function () {
      abode.message({'type': 'success', 'message': 'Interface Deleted'});
      $state.go('^');
    }, function (err) {
      abode.message({'type': 'failed', 'message': 'Failed to save Interface', 'details': err});
      $scope.errors = err;
    });
  };
}]);

settings.controller('settings', function ($scope, $state, abode, settings, config) {
  var notifier = abode.message;
  $scope.config = config;
  $scope.state = $state;
  $scope.reload = function () {
    document.location.reload();
  };

  $scope.sensors = [
    {'name': 'Temperature/Humidity', 'route': 'index.settings.general'},
    {'name': 'Light', 'route': 'index.settings.home'},
    {'name': 'Motion', 'route': 'index.settings.sources'},
  ];

  $scope.providers = [
    {'name': 'Insteon PLM', 'route': 'index.settings.insteon'},
    {'name': 'Insteon Hub', 'route': 'index.settings.insteonhub'},
    {'name': 'Rad', 'route': 'index.settings.rad'},
    {'name': 'Wunderground', 'route': 'index.settings.wunderground'},
    {'name': 'IFTTT', 'route': 'index.settings.ifttt'},
    {'name': 'RadioThermostat', 'route': 'index.settings.radiothermostat'},
    {'name': 'Video', 'route': 'index.settings.video'},
  ];

  $scope.sources = [
    {'name': 'Muir', 'route': 'index.settings.insteon'},
  ];

  $scope.providerSettings = function (p) {
    $state.go(p);
  };

  $scope.save = function () {

    settings.save_config(undefined, $scope.config).then(function () {

      notifier.notify({
        'status': 'success',
        'message': 'Settings Saved'
      });

    }, function (err) {
      notifier.notify({
        'status': 'failed',
        'message': 'Settings Failed to Save',
        'details': err
      });
    });

  };

  $scope.write_config = function () {
    settings.write_config().then(function () {

      notifier.notify({
        'status': 'success',
        'message': 'Config Saved'
      });

    }, function (err) {

      notifier.notify({
        'status': 'failed',
        'message': 'Failed to Save Config',
        'details': err
      });

    });
  };
});
