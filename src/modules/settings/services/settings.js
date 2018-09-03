
var settings = angular.module('abode.settings');

settings.service('settings', function ($q, $http, $templateCache, $timeout, $uibModal, abode, confirm) {

  var get_sources = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/sources').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_source = function (name) {
    var defer = $q.defer();

    $http.get(abode.url('/api/sources/' + name).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var save_source = function (source) {
    var defer = $q.defer();

    $http.put(abode.url('/api/sources/' + source._id).value(), source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var add_source = function (source) {
    var defer = $q.defer();

    $http.post(abode.url('/api/sources/'), source).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var remove_source = function (source) {
    var defer = $q.defer();

    $http.delete(abode.url('/api/sources/' + source._id).value()).then(function () {
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

    $http.put(abode.url(url).value(), config).then(function (response) {
      write_config().then(function (response) {
        defer.resolve(response);
      }, function (err) {
        defer.reject(err);
      });
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var write_config = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/abode/save').value()).then(function (response) {
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

  var check_db = function (config) {
    var defer = $q.defer();

    $http.post('/api/abode/check_db', config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var reload = function (config) {
    var count = 0,
        defer = $q.defer();

    $http.post(abode.url('/api/abode/reload').value(), config, {timeout: 1000});

    var check = function () {
      count += 1;

      if (count > 5) {
        return defer.reject();
      }

      $http.get(abode.url('/api/abode/status').value(), {timeout: 1000}).then(function () {
        defer.resolve();
      }, function () {
        $timeout(check, 1000 * count);
      });
    };

    $timeout(check, 5000);

    return defer.promise;
  };

  var get_providers = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/abode/providers').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var install_provider = function (provider) {
    var defer = $q.defer();

    var fail = function (msg, err) {
      defer.reject({'message': msg, 'details': err});
    };

    var save = function (config) {
      if (config.providers.indexOf(provider) >= 0) {
        return fail('Provider already installed');
      }

      config.providers.push(provider);

      save_config(undefined, config).then(function () {
        reload().then(function () {
          defer.resolve();
        }, function (err) {
          fail('Failed to reload Abode', err);
        })
      }, function (err) {
        fail('Failed to save config', err);
      });
    };

    get_config().then(function (config) {
      save(config);
    }, function (err) {
      fail('Failed to get config', err);
    });

    return defer.promise;
  };

  var remove_provider = function (provider) {
    var defer = $q.defer();

    var fail = function (msg, err) {
      defer.reject({'message': msg, 'details': err});
    };

    var save = function (config) {
      if (config.providers.indexOf(provider) === -1) {
        return fail('Provider not installed');
      }

      config.providers.splice(config.providers.indexOf(provider), 1);

      save_config(undefined, config).then(function () {
        reload().then(function () {
          defer.resolve();
        }, function (err) {
          fail('Failed to reload Abode', err);
        })
      }, function (err) {
        fail('Failed to save config', err);
      });
    };

    get_config().then(function (config) {
      save(config);
    }, function (err) {
      fail('Failed to get config', err);
    });

    return defer.promise;
  };

  var add_pin_panel = function (panels) {
    var addPanelModal = $uibModal.open({
      animation: true,
      templateUrl: 'modules/settings/views/settings.pins.add.panel.modal.html',
      size: 'sm',
      resolve: {
        'current': function () {
          var current = panels.map(function (panel) {
            return panel.device;
          });

          return current;
        }
      },
      controller: ['$scope', '$uibModalInstance', 'current', function ($scope, $uibModalInstance, current) {
        $scope.panel = {};
        $scope.current = current;

        $scope.add = function () {
          $uibModalInstance.close($scope.panel);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };
      }]
    });

    addPanelModal.result.then(function (panel) {
      panels.push(panel);
    });
  };

  var edit_pin_panel = function (index, panel, panels) {
    var editPanelModal = $uibModal.open({
      animation: true,
      templateUrl: 'modules/settings/views/settings.pins.edit.panel.modal.html',
      size: 'sm',
      resolve: {
        'panel': function () {
          return angular.copy(panel);
        },
        'current': function () {
          var current = panels.map(function (panel) {
            return panel.device;
          });

          return current;
        }
      },
      controller: ['$scope', '$uibModalInstance', 'panel', 'current', function ($scope, $uibModalInstance, panel, current) {
        $scope.panel = panel;
        $scope.current = current;

        $scope.save = function () {
          $uibModalInstance.close($scope.panel);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };
      }]
    });

    editPanelModal.result.then(function (panel) {
      panels.splice(index, 1, panel);
    });
  };

  var remove_pin_panel = function (panels, index) {

    confirm('Are you sure?', {'title': 'Delete Panel', 'icon': 'icon-trash'}).then(function () {
      panels.splice(index, 1);
    });

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
    check_db: check_db,
    reload: reload,
    get_providers: get_providers,
    install_provider: install_provider,
    remove_provider: remove_provider,
    add_pin_panel: add_pin_panel,
    edit_pin_panel: edit_pin_panel,
    remove_pin_panel: remove_pin_panel,
  };

});
