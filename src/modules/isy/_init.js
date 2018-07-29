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
.service('isy', function ($http, $q, abode, settings) {

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

  return {
    get_config: get_config,
    save: save_config,
    status: status,
    enable: enable,
    disable: disable,
    get_devices: get_devices,
    get_groups: get_groups
  };

})
.controller('isySettings', function ($scope, isy, abode, config, status) {

  $scope.status = status;
  $scope.config = config;

  isy.get_devices().then(function (results) {
    $scope.devices = results;
  }, function () {
  });

  isy.get_groups().then(function (results) {
    $scope.groups = results;
  }, function () {
  });

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

   isy.get_devices();
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
