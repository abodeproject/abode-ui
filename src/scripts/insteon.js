angular.module('insteon', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.insteon', {
    url: '/settings',
    templateUrl: 'views/providers/insteon/settings.html',
    controller: 'insteonSettings',
    resolve: {
      status: function (insteon) {
        return insteon.status();
      }
    }
  });
})
.service('insteon', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('insteon');

  };

  var save_config = function (config) {

    return settings.save_config('insteon', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/insteon').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/disable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var beep = function (addr) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/devices/' + addr + '/beep').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enterlinking = function (addr, group) {
    var defer = $q.defer();

    group = group || 1;
    $http.post(abode.url('/api/insteon/devices/' + addr + '/enter_linking_mode/' + group).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enterunlinking = function (addr, group) {
    var defer = $q.defer();

    group = group || 1;
    $http.post(abode.url('/api/insteon/devices/' + addr + '/enter_unlinking_mode/' + group).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var exitlinking = function (addr) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/devices/' + addr + '/exit_linking_mode').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var delete_database_record = function (address, offset) {
    var defer = $q.defer();

    $http.delete(abode.url('/api/insteon/devices/' + address + '/database/' + offset).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var rates = [
    {'value': 0, 'text': '9 min'},
    {'value': 1, 'text': '8 min'},
    {'value': 2, 'text': '7 min'},
    {'value': 3, 'text': '6 min'},
    {'value': 4, 'text': '5 min'},
    {'value': 5, 'text': '4.5 min'},
    {'value': 6, 'text': '4 min'},
    {'value': 7, 'text': '3.5 min'},
    {'value': 8, 'text': '3 min'},
    {'value': 9, 'text': '2.5 min'},
    {'value': 10, 'text': '2 min'},
    {'value': 11, 'text': '1.5 min'},
    {'value': 12, 'text': '1 min'},
    {'value': 13, 'text': '47 sec'},
    {'value': 14, 'text': '43 sec'},
    {'value': 15, 'text': '38.5 sec'},
    {'value': 16, 'text': '34 sec'},
    {'value': 17, 'text': '32 sec'},
    {'value': 18, 'text': '30 sec'},
    {'value': 19, 'text': '28 sec'},
    {'value': 20, 'text': '26 sec'},
    {'value': 21, 'text': '23.5 sec'},
    {'value': 22, 'text': '21.5 sec'},
    {'value': 23, 'text': '19 sec'},
    {'value': 24, 'text': '8.5 sec'},
    {'value': 25, 'text': '6.5 sec'},
    {'value': 26, 'text': '4.5 sec'},
    {'value': 27, 'text': '2.0 sec'},
    {'value': 28, 'text': '0.5 sec'},
    {'value': 29, 'text': '0.3 sec'},
    {'value': 30, 'text': '0.2 sec'},
    {'value': 31, 'text': '0.1 sec'}
  ];

  var get_devices = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/insteon/devices').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var update_database_record = function (address, offset, record) {
    var defer = $q.defer();
    var data = angular.copy(record);

    if (data.on_level) {
      data.on_level = parseInt(data.on_level /100 * 255, 10);
    }

    $http.put(abode.url('/api/insteon/devices/' + address + '/database/' + offset).value(), data).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var add_database_record = function (address, record) {
    var defer = $q.defer();
    var data = angular.copy(record);

    if (data.on_level) {
      data.on_level = parseInt(data.on_level /100 * 255, 10);
    }

    $http.post(abode.url('/api/insteon/devices/' + address + '/database').value(), data).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return {
    get_config: get_config,
    save: save_config,
    status: status,
    enable: enable,
    disable: disable,
    beep: beep,
    enterlinking: enterlinking,
    enterunlinking: enterunlinking,
    exitlinking: exitlinking,
    delete_database_record: delete_database_record,
    rates: rates,
    get_devices: get_devices,
    update_database_record: update_database_record,
    add_database_record: add_database_record
  };

})
.filter('insteonRate', function() {
  var rates = [
    '9 min',
    '8 min',
    '7 min',
    '6 min',
    '5 min',
    '4.5 min',
    '4 min',
    '3.5 min',
    '3 min',
    '2.5 min',
    '2 min',
    '1.5 min',
    '1 min',
    '47 sec',
    '43 sec',
    '38.5 sec',
    '34 sec',
    '32 sec',
    '30 sec',
    '28 sec',
    '26 sec',
    '23.5 sec',
    '21.5 sec',
    '19 sec',
    '8.5 sec',
    '6.5 sec',
    '4.5 sec',
    '2.0 sec',
    '0.5 sec',
    '0.3 sec',
    '0.2 sec',
    '0.1 sec'
  ];

  return function(rate) {
    return (rates[rate]) ? rates[rate] : rate;
  };
})
.filter('toHex', function () {
  return function(value) {
    var hex = parseInt(value, 10).toString(16);
    if (hex.length % 2 !== 0) {
      hex = '0' + hex;
    }
    return '0x' + hex;
  };
})
.controller('insteonSettings', function ($scope, $http, insteon, abode, status) {

  $scope.enabling = false;
  $scope.status = status;
  $scope.config = status.config;
  $scope.devices = [
    '/dev/ttyUSB0',
    '/dev/ttyUSB1',
    '/dev/ttyUSB2',
    '/dev/ttyUSB3',
  ];

  $scope.get_status = function () {
    insteon.status().then(function (status) {
      $scope.status = status;
    });
  };

  $scope.toggle = function () {
    $scope.enabling = true;

    var success = function () {
      $scope.enabling = false;
      $scope.error = '';

      $scope.get_status();
    };

    var failure = function (err) {
      $scope.enabling = false;
      $scope.error = err.data.message;
      $scope.get_status();
    };

    if ($scope.status.enabled) {
      insteon.disable().then(success, failure);
    } else {
      insteon.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    insteon.save($scope.config).then(function () {
      $scope.status = 'saved';

      abode.message({
        'type': 'success',
        'message': 'Insteon Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Insteon Settings Failed to Saved',
        'details': err
      });
    });

  };

})
.controller('insteonEdit', function ($scope, $http, $uibModal, abode, insteon) {
  $scope.device = $scope.$parent.device;
  $scope.loading = false;
  $scope.error = false;

  $scope.reload_database = function () {
    $scope.loading = true;
    $scope.error = false;
    $http.post(abode.url('/api/insteon/devices/' + $scope.device.config.address + '/load_database').value()).then(function (response) {
      $scope.loading = false;
      $scope.error = false;
      $scope.device.config.database = response.data;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.beep = function () {
    insteon.beep($scope.device.config.address);
  };

  $scope.enterlinking = function (group) {
    insteon.enterlinking($scope.device.config.address, group);
  };

  $scope.enterunlinking = function (group) {
    insteon.enterunlinking($scope.device.config.address, group);
  };

  $scope.exitlinking = function () {
    insteon.exitlinking($scope.device.config.address);
  };

  $scope.add_link = function () {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'views/providers/insteon/link.html',
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        device: function () { return $scope.device; },
      },
      controller: ['$scope', '$uibModalInstance', '$timeout', 'insteon', 'device', function ($uiScope, $uibModalInstance, $timeout, insteon, device) {
        $uiScope.action = 'Add';
        $uiScope.loading = true;
        $uiScope.error = '';
        $uiScope.rates = insteon.rates;

        insteon.get_devices().then(function (results) {
          $uiScope.loading = false;
          $uiScope.devices = results;
        }, function () {
          $uiScope.loading = false;
        });

        $uiScope.controller_options =[
          {'text': 'Control Device', 'value': true},
          {'text': 'Response to Device', 'value': false}
        ];
        $uiScope.record = {
          controller: true,
          group: 1,
          on_level: 100,
          ramp_rate: 31,
          button: 1,
        };

        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.save = function () {
          $uiScope.loading = true;
          $uiScope.error = '';

          insteon.add_database_record(device.config.address, $uiScope.record).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err;
            $uiScope.loading = false;
          });
        };

        $timeout(function () {
            $uiScope.$broadcast('rzSliderForceRender');
        }, 100);
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

  $scope.edit_link = function (record) {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'views/providers/insteon/link.html',
      size: 'sm',
      resolve: {
        device: function () { return $scope.device; },
        record: function () { return angular.copy(record); }
      },
      controller: ['$scope', '$uibModalInstance', '$timeout', 'insteon', 'device', 'record', function ($uiScope, $uibModalInstance, $timeout, insteon, device, record) {
        $uiScope.action = 'Edit';
        $uiScope.record = record;
        $uiScope.loading = true;
        $uiScope.error = '';
        $uiScope.rates = insteon.rates;

        if ($uiScope.record.on_level) {
          $uiScope.record.on_level = parseInt($uiScope.record.on_level / 255 * 100, 10);
        }

        $uiScope.controller_options =[
          {'text': 'Control Device', 'value': true},
          {'text': 'Response to Device', 'value': false}
        ];

        insteon.get_devices().then(function (results) {
          $uiScope.loading = false;

          results = results.filter(function (item) {
            return (item.config.address !== device.config.address);
          });

          var matches = results.filter(function (item) {
            return (item.address === record.address);
          });

          if (matches.length === 0) {
            results.push({'config': {'address': record.address}, 'name': record.address});
          }

          $uiScope.devices = results;
        }, function () {
          $uiScope.loading = false;
        });


        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.save = function () {
          $uiScope.loading = true;
          $uiScope.error = '';

          insteon.update_database_record(device.config.address, $uiScope.record.id, $uiScope.record).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err;
            $uiScope.loading = false;
          });
        };

        $timeout(function () {
            $uiScope.$broadcast('rzSliderForceRender');
        }, 100);
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

  $scope.delete_link = function (record) {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'views/providers/insteon/confirm_delete.html',
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        device: function () { return $scope.device; },
        record: function () { return record; }
      },
      controller: ['$scope', '$uibModalInstance', 'device', 'record', function ($uiScope, $uibModalInstance, device, record) {

        $uiScope.loading = false;
        $uiScope.record = record;
        $uiScope.device = device;
        $uiScope.error = '';

        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.confirm = function () {
          $uiScope.loading = true;
          $uiScope.error = '';
          insteon.delete_database_record(device.config.address, record.id).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err.data;
            $uiScope.loading = false;
          });
        };
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

})
.controller('insteonAdd', function ($scope, $http, $timeout, abode) {
  $scope.device = $scope.$parent.device;
  $scope.link_status = 'idle';
  $scope.device_types = [
    {
      'name': 'Dimmable Light',
      'capabilities': ['light', 'dimmer'],
      'controller': true,
      'active': true,
    },
    {
      'name': 'On/Off Switch',
      'capabilities': ['light', 'onoff'],
      'controller': true,
      'active': true,
    },
    {
      'name': 'Door Sensor',
      'capabilities': ['door', 'onoff'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Window Sensor',
      'capabilities': ['window', 'onoff'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Motion Sensor',
      'capabilities': ['motion_sensor'],
      'controller': false,
      'active': false,
    },
    {
      'name': 'Scene',
      'capabilities': ['onoff', 'scene'],
      'active': true,
    }
  ];

  $scope.changeType = function (t) {
    $scope.type = t;
    $scope.device.capabilities = t.capabilities;
    $scope.device.active = t.active;
  };

  $scope.get_last = function () {
    $http.get(abode.url('/api/insteon/linking/last').value()).then(function (response) {
      $scope.device.config = response.data;
      $scope.link_status = 'idle';
    }, function (err) {
      $scope.error = err;
    });
  };
  $scope.check_linking = function () {
    $http.get(abode.url('/api/insteon').value()).then(function (response) {
      if (!response.data.linking) {
        $scope.link_status = 'idle';
        if (response.data.last_linked) {
          $scope.device.config = response.data.last_linked;
        }

      } else {
        $timeout($scope.check_linking, 2000);
      }
    }, function (err) {
      $scope.error = err;
    });
  };

  $scope.start_linking = function () {
    $scope.link_status = 'linking';

    $http.post(abode.url('/api/insteon/start_all_linking').value(), {'controller': $scope.type.controller}).then(function (response) {
      $timeout($scope.check_linking, 2000);
    }, function (err) {
      $scope.error = err;
      $scope.link_status = 'idle';
    });

  };

  $scope.cancel_linking = function () {

    $http.post(abode.url('/api/insteon/cancel_all_linking').value()).then(function (response) {
      $scope.link_status = 'idle';
    }, function (err) {
      $scope.link_status = 'linking';
    });

  };

});
