angular.module('insteon', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.insteon', {
    url: '/settings',
    templateUrl: '/views/providers/insteon/settings.html',
    controller: 'insteonSettings',
    resolve: {
      config: function (insteon) {
        return insteon.get_config();
      }
    }
  });
})
.service('insteon', function (settings) {

  var get_config = function () {

    return settings.get_config('insteon');

  };

  var save_config = function (config) {

    return settings.save_config('insteon', config);

  };

  return {
    get_config: get_config,
    save: save_config
  };

})
.filter('insteonRate', function() {
  rates = [
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
  ]
  return function(rate) {
    return (rates[rate]) ? rates[rate] : rate;
  };
})
.controller('insteonSettings', function ($scope, insteon, abode, config) {

  $scope.config = config;
  $scope.devices = [
    '/dev/ttyUSB0',
    '/dev/ttyUSB1',
    '/dev/ttyUSB2',
    '/dev/ttyUSB3',
  ];

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
.controller('insteonEdit', function ($scope, $http, abode) {
  $scope.device = $scope.$parent.device;
  $scope.loading = false;
  $scope.error = false;

  $scope.reload_database = function () {
    $scope.loading = true;
    $http.post(abode.url('/api/insteon/devices/' + $scope.device.config.address + '/load_database').value()).then(function (response) {
      $scope.loading = false;
      $scope.error = false;
      $scope.device.config.database = response.data;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.add_link = function () {
    console.log('add');
  };

  $scope.edit_link = function () {
    console.log('edit');
  };

  $scope.delete_link = function () {
    console.log('delete');
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
