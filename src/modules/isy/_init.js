angular.module('isy', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.isy', {
    url: '/isy',
    templateUrl: 'modules/isy/views/settings.html',
    controller: 'isySettings',
    resolve: {
      config: function (isy) {
        return isy.get_config();
      },
      status: function (isy) {
        return isy.status();
      }
    }
  });
})
.service('isy', function ($http, $q, $uibModal, abode, settings) {

  var get_config = function () {

    return settings.get_config('isy');

  };

  var save_config = function (config) {

    return settings.save_config('isy', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/isy').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/isy/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/isy/disable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };


  var get_devices = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/isy/devices').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };


  var get_groups = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/isy/groups').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var node_on = function (node) {
    var defer = $q.defer();

    var node_type = (node.config.type === 'group') ? 'groups' : 'devices';

    $http.post(abode.url('/api/isy/' + node_type + '/' + node.config.address + '/on').value()).then(function () {
      defer.resolve();
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var node_off = function (node) {
    var defer = $q.defer();
    var node_type = (node.config.type === 'group') ? 'groups' : 'devices';

    $http.post(abode.url('/api/isy/' + node_type + '/' + node.config.address + '/off').value()).then(function () {
      defer.resolve();
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var node_status = function (node) {
    var defer = $q.defer();
    var node_type = (node.config.type === 'group') ? 'groups' : 'devices';

    $http.get(abode.url('/api/isy/' + node_type + '/' + node.config.address).value()).then(function (result) {
      defer.resolve(result.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var open_replace = function (node) {

    return $uibModal.open({
      animation: true,
      templateUrl: 'modules/isy/views/replace.html',
      controller: 'isyReplace',
      keyboard: false,
      backdrop: 'static',
      resolve: {
        'node': function () {
          return node_status(node);
        }
      }
    });
  };

  return {
    get_config: get_config,
    save: save_config,
    status: status,
    enable: enable,
    disable: disable,
    get_devices: get_devices,
    get_groups: get_groups,
    node_on: node_on,
    node_off: node_off,
    node_status: node_status,
    open_replace: open_replace
  };

})
.controller('isyReplace', function ($scope, $uibModalInstance, $timeout, confirm, devices, Devices, node) {
  $scope.node = node;
  $scope.loading = true;
  $scope.replacing = false;

  $scope.select = function (device) {
    var msg = 'Are you sure you want to replace Abode Device "' + device.name + '" with the Isy Device "' + node.name + '"';
    confirm(msg, {'title': 'Confirm Replace'}).then(function () {
      $scope.replacing = true;
      Devices.get({'id': device._id}).$promise.then(function (result) {
        $scope.device = result;

        if ($scope.device.config && $scope.device.config.address === $scope.node.config.address) {
          $scope.error = true;
          $scope.error_msg = 'Devices are the same';
          return;
        }

        $scope.device.provider = 'isy';
        $scope.device.config = $scope.node.config;
        delete $scope.device.config.is_abode;

        $scope.device.$update().then(function () {
          $scope.complete = true;

          $timeout(function () {
            $uibModalInstance.close();
          }, 2000);
        }, function (err) {
          $scope.error = true;
          $scope.error_msg = err.data.message;
        });
      }, function (err) {
          $scope.error = true;
          $scope.error_msg = err.data.message;
      });
    }, function () {
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };

  if ($scope.node.config.is_abode) {
    $scope.loading = false;
    $scope.replacing = true;
    $scope.error = true;
    $scope.error_msg = 'Isy Device already assigned to an Abode Device';
  } else {
    devices.load().then(function (devices) {
      $scope.devices = devices;
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  }
})
.controller('isySettings', function ($scope, isy, abode, config, status) {

  $scope.status = status;
  $scope.config = config;
  $scope.devices = [];
  $scope.groups = [];

  $scope.get_status = function () {
    isy.status().then(function (status) {
      $scope.status = status;
      $scope.config.enabled = $scope.status.enabled;
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
      isy.disable().then(success, failure);
    } else {
      isy.enable().then(success, failure);
    }
  };

  $scope.save = function () {

    isy.save($scope.config).then(function () {

      abode.message({
        'type': 'success',
        'message': 'Isy Settings Saved'
      });

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Isy Settings Failed to Saved',
        'details': err
      });
    });

  };

  $scope.reload_devices = function () {
    $scope.devices_loading = true;

    isy.get_devices().then(function (results) {
      $scope.devices_loading = false;
      $scope.devices = results;
    }, function () {
      $scope.devices_loading = false;
    });
  };

  $scope.reload_groups = function () {
    $scope.groups_loading = true;

    isy.get_groups().then(function (results) {
      $scope.groups_loading = false;
      $scope.groups = results;
    }, function () {
      $scope.groups_loading = false;
    });
  };

  $scope.send_on = function (node) {
    $scope.sending_command = true;
    isy.node_on(node).then(function () {
      $scope.sending_command = false;
    }, function () {
      $scope.sending_command = false;
    });
  };

  $scope.send_off = function (node) {
    $scope.sending_command = true;
    isy.node_off(node).then(function () {
      $scope.sending_command = false;
    }, function () {
      $scope.sending_command = false;
    });
  };

  $scope.get_status = function (node) {
    $scope.sending_command = true;
    isy.node_status(node).then(function (result) {
      $scope.sending_command = false;
      Object.assign(node, result);
    }, function () {
      $scope.sending_command = false;
    });
  };

  $scope.replace = function (node) {
    isy.open_replace(node);
  };

  $scope.reload_devices();
  $scope.reload_groups();
})
.controller('isyEdit', function ($scope, $http, $timeout, abode) {
  $scope.device = $scope.$parent.device;
})
.controller('isyAdd', function ($scope, $http, $timeout, abode) {
  $scope.device = $scope.$parent.device;
  $scope.loading = false;
  $scope.processing = false;
  $scope.device_types = [
    {
      'name': 'Device',
      'capabilities': ['light', 'dimmer'],
      'active': true,
      'type': 'devices'
    },
    {
      'name': 'Group',
      'capabilities': ['scene','onoff'],
      'active': true,
      'type': 'groups',
      'icon': 'icon-picture'
    },
    {
      'name': 'Program',
      'capabilities': ['onoff'],
      'active': true,
      'type': 'programs'
    }
  ];

  $scope.changeType = function (t) {
    $scope.type = t;
    $scope.device.capabilities = t.capabilities;
    $scope.device.active = t.active;

    $scope.loading = true;
    $http.get(abode.url('/api/isy/' + t.type).value()).then(function (response) {
      console.dir(response.data);
      $scope.devices = response.data;
      $scope.loading = false;
    }, function (err) {
      $scope.error = err;
      $scope.loading = false;
    });
  };

  $scope.selectDevice = function (d) {
    $scope.device.name = d.name;
    $scope.device.capabilities = d.capabilities || $scope.device.capabilities;
    $scope.device.config = d.config;
  };

  $scope.selectScene = function (d) {
    $scope.device.name = d.name;
    $scope.device.capabilities = d.capabilities || $scope.device.capabilities;
    $scope.device.config = d.config;
  };

  $scope.selectRoom = function (d) {
    $scope.device.name = d.RoomName;
    $scope.device.capabilities = d.capabilities || $scope.device.capabilities;
    $scope.device.config = d.config;
  };

  $scope.reload = function () {
    $scope.processing = true;

    $http.post(abode.url('/api/isy/refresh').value()).then(function (response) {
      $scope.processing = false;
      $scope.changeType($scope.type);
    }, function (err) {
      $scope.error = err;
      $scope.processing = false;
    });
  };

});
